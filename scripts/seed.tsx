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
        console.log('seeding finished')
    } catch (error) {
        console.log(error);
        throw new Error('failed to seed the database');
    }
}
