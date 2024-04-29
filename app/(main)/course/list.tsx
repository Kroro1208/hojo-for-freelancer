"use client"

import { course, userProgress } from "@/db/schema";
import { Card } from "./card";

type Props = {
    course: typeof course.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ course, activeCourseId }:Props) => {
    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            { course.map((item) => (
                <Card
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    imageSrc={item.imageSrc}
                    onClick={() =>{}}
                    disabled={false}
                    active={item.id === activeCourseId}
                />
                )
            )}
        </div>
    );
};