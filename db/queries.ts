import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { course, userProgress } from "./schema";
import { eq } from "drizzle-orm";

export const getUserProgress = cache(async() => {
    const { userId } = await auth();

    if(!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        },
    });

    return data;
})

export const getCourse = cache(async () => {
    const data = await db.query.course.findMany();
    return data;
});

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.course.findFirst({
        where: eq(course.id, courseId),
        // todo Populate units and lessons
    });
    return data;
});