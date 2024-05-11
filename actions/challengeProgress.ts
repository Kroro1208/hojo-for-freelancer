"use server"

import db from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export const upsertChallengeProgress = async (challengeId: number) => {
    const {userId} = await auth();

    if(!userId) {
        throw new Error("認証されていないユーザーです");
    }

    const currentUserProgress = await getUserProgress();
    const userSubscription = await getUserSubscription();
    
    if(!currentUserProgress) {
        throw new Error("途中のはありません");
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    });

    if(!challenge) {
        throw new Error("途中のチャレンジはありません")
    }

    const lessonId = challenge.lessonId;
    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        )
    });

    // 完了しているレッスンを再度する場合のロジック
    const isPractice = !!existingChallengeProgress;
    if(currentUserProgress.hearts === 0 && !isPractice && !userSubscription?.isActive) {
        return { error: "ハートを補充する必要があります" };
    }

    if(isPractice) {
        await db.update(challengeProgress).set({
            completed: true,
        }).where(
            eq(challengeProgress.id, existingChallengeProgress.id)
        );

        await db.update(userProgress).set({
            hearts: Math.min(currentUserProgress.hearts + 1, 5),
            points: currentUserProgress.points + 10,
        }).where(
            eq(userProgress.userId, userId)
        );

        revalidatePath("/learn");
        revalidatePath("/lesson");
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
        revalidatePath(`/lesson/${lessonId}`);
        return;
    }

    await db.insert(challengeProgress).values({
        challengeId,
        userId,
        completed: true
    });

    await db.update(userProgress).set({
        points: currentUserProgress.points + 10
    }).where(
        eq(userProgress.userId, userId)
    );
    
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return;
}