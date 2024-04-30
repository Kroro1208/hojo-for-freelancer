"use server"

import db from "@/db/drizzle";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";

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
    // if(!course.units.lenght || !course.units[0].lessons.lenght) {
    //     throw new Error('コールが見つかりません');
    // }

    // todo enable once units and lessons
    const existingUserProgress = await getUserProgress();
    if(existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "mascot.svg"
        });

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