import db from "@/db/drizzle"
import { NextResponse } from "next/server";

export const GET = async () => {
    const data = await db.query.course.findMany();
    return NextResponse.json(data);
}