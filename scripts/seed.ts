import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import { challenges } from '../db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, {schema});

const main = async () => {
    try {
        console.log("seedeing database");
        await db.delete(schema.course);
        await db.delete(schema.userProgress)
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.course).values([
            {
                id: 1,
                title: "社長",
                imageSrc: "/leader.svg"
            },
            {
                id: 2,
                title: "起業",
                imageSrc: "/businessman.svg"
            },
            {
                id: 3,
                title: "フリーランス",
                imageSrc: "/fight.svg"
            },
            {
                id: 4,
                title: "家族",
                imageSrc: "/family.svg"
            },
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: 'Unit 1',
                description: '社長のための節税基礎コース',
                order: 1
             }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                title: '基礎',
                order: 1,
             },
             {
                id: 2,
                unitId: 1,
                title: '所得税',
                order: 2,
             },
             {
                id: 3,
                unitId: 1,
                title: '累進課税',
                order: 3,
             },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, // 基礎
                type: 'SELECT',
                order: 1,
                question: '医療費は年間いくらを超えると控除にできる？'
            },
            {
                id: 2,
                lessonId: 2, // 所得税
                type: 'SELECT',
                order: 2,
                question: '所得税に関して最も適切なものはどれ？'
            },
            {
                id: 3,
                lessonId: 3, // 累進課税
                type: 'SELECT',
                order: 3,
                question: '累進課税について最も適切なものは？'
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1, // 医療費は年間いくらを超えると控除にできる？
                imageSrc: '/10.svg',
                correct: true,
                text: '10万円',
                audioSrc: '/correct.mp3'
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: '/5.svg',
                correct: false,
                text: '5万円',
                audioSrc: '/incorrect.mp3'
            },
            {
                id: 3,
                challengeId: 1,
                imageSrc: '/8.svg',
                correct: false,
                text: '8万円',
                audioSrc: '/incorrect.mp3'
            },
        ]);

        console.log('seeding finished')
    } catch (error) {
        console.log(error);
        throw new Error('failed to seed the database');
    }
}

main();