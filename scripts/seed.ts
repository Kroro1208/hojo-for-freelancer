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
             {
                id: 4,
                unitId: 1,
                title: '青色申告',
                order: 4,
             },
             {
                id: 5,
                unitId: 1,
                title: '経費',
                order: 5,
             },
        ]);

        // 1レッスン内にある問題(全5問の予定)
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
                lessonId: 1, // 所得税
                type: 'SELECT',
                order: 2,
                question: '所得税に関して最も適切なものはどれ？'
            },
            {
                id: 3,
                lessonId: 1, // 累進課税
                type: 'SELECT',
                order: 3,
                question: '累進課税に関して最も適切なものはどれ'
            },
        ]);
        
        // 問題の選択肢
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1, // 医療費は年間いくらを超えると控除にできる？
                imageSrc: '/10.svg',
                correct: true,
                text: '10万円',
                audioSrc: '/10.mp3'
            },
            {
                challengeId: 1,
                imageSrc: '/5.svg',
                correct: false,
                text: '5万円',
                audioSrc: '/5.mp3'
            },
            {
                challengeId: 1,
                imageSrc: '/8.svg',
                correct: false,
                text: '8万円',
                audioSrc: '/8.mp3'
            },
            {
                challengeId: 2, // 所得税に関して最も適切なものはどれ？
                imageSrc: '',
                correct: true,
                text: '収入からいろいろ引いて残りの金額に税率をかけるのが所得税(課税所得×税率)',
                audioSrc: '/syotoku1.mp3'
            },
            {
                challengeId: 2,
                imageSrc: '',
                correct: false,
                text: '所得税は個人の全収入に一律の税率を適用して計算される',
                audioSrc: '/syotoku2.mp3'
            },
            {
                challengeId: 2,
                imageSrc: '',
                correct: false,
                text: '所得税は収入に対して同一の税率が適用され、その税率は国によって固定されている',
                audioSrc: '/syotoku3.mp3'
            },
            {
                challengeId: 3, // 累進課税について最も適切なものは？
                correct: false,
                text: '年収195~329万円の人は全員10%かかる',
                audioSrc: '/ruishin1.mp3'
            },
            {
                challengeId: 3,
                correct: true,
                text: '課税される所得金額の範囲を超えた分だけ税率が上がる',
                audioSrc: '/ruishin2.mp3'
            },
            {
                challengeId: 3,
                correct: false,
                text: '所得が増えるにつれて全体の税率が下がり、高収入者ほど「収入額に対しての」税負担が軽くなる',
                audioSrc: '/ruishin3.mp3'
            },
        ]);

        console.log('seeding finished')
    } catch (error) {
        console.log(error);
        throw new Error('failed to seed the database');
    }
}

main();