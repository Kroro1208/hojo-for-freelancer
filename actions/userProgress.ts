"use server"

import db from "@/db/drizzle";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCourseById, getUserProgress, getUserSubscription } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { POINTS_TO_REFILL } from "@/constants";

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if(!userId || !user) {
        throw new Error("認証されていないユーザーです");
    }

    const course = await getCourseById(courseId);

    if(!course) {
        throw new Error("選択されたコースが見つかりませんでした");
    }

    // 途中のレッスンの取得
    if(!course.units.length || !course.units[0].lessons.length) {
        throw new Error('取り組み中のレッスンはありません');
    }

    const existingUserProgress = await getUserProgress();
    if(existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg"
        });

        // キャッシュの無効化
        revalidatePath("/course");
        revalidatePath("/learn");
        redirect('/learn');
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "mascot.svg"
    });

    revalidatePath("/course");
    revalidatePath("/learn");
    redirect('/learn');
    
}

export const reduceHearts = async (challengeId: number) => {
    const { userId } = await auth();
    if(!userId) {
        throw new Error('認証されていないユーザーです');
    }

    const currentUserProgress = await getUserProgress();
    const userSubscription = await getUserSubscription();

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),

    });

    if(!challenge) {
        throw new Error('問題が見つかりません');
    }

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        )
    });
    const isPractice = !!existingChallengeProgress;

    if(isPractice) {
        return { error: "復習中です"};
    }

    if(!currentUserProgress) {
        throw new Error('ユーザー成績が見つかりません');
    }

    if(currentUserProgress.hearts === 0) {
        return { error: "hearts"};
    }

    if(!userSubscription?.isActive) {
        return { error: "subscription"};
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts -1, 0)
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts =async () => {
    const currentUserprogress = await getUserProgress();
    if(!currentUserprogress) {
        throw new Error('ユーザー情報が見つかりません');
    }
    if(currentUserprogress.hearts === 5) {
        throw new Error('ハートはすでに満タンです');
    }
    if(currentUserprogress.points < POINTS_TO_REFILL) {
        throw new Error('十分なポイントがありません');
    }
    await db.update(userProgress).set({
        hearts: 5,
        // 10ポイント使用してハートを満タンにする
        points: currentUserprogress.points - POINTS_TO_REFILL,
    }).where(eq(userProgress.userId, currentUserprogress.userId));

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
};