import { cache } from "react";
import db from "./drizzle";

export const getCourse = cache(async () => {
    const data = await db.query.course.findMany();
    return data;
});