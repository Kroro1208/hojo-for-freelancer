"use client"
import { useRouter } from "next/navigation";
import { course, userProgress } from "@/db/schema";
import { Card } from "./card";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/userProgress";

type Props = {
    course: typeof course.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ course, activeCourseId }:Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if(pending) return;
        if(id === activeCourseId) {
            return router.push('/learn');
        }
        startTransition(()=> {
            upsertUserProgress(id);
        });
    }

    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            { course.map((item) => (
                <Card
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    imageSrc={item.imageSrc}
                    onClick={onClick}
                    disabled={pending}
                    active={item.id === activeCourseId}
                />
                )
            )}
        </div>
    );
};