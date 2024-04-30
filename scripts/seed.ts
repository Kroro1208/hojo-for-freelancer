import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, {schema});

const main = async () => {
    try {
        console.log("seedeing database");
        await db.delete(schema.course);
        await db.delete(schema.userProgress)
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
        console.log('seeding finished')
    } catch (error) {
        console.log(error);
        throw new Error('failed to seed the database');
    }
}

main();