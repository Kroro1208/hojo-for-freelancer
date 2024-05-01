import { lessons, units } from "@/db/schema";
import { UnitBanner } from "./unitBanner";
import { LessonButton } from "./lessonButton";

type Props = {
    id: number;
    order: number;
    title: string;
    description: string;
    lessons: (typeof lessons.$inferSelect & {
        completed: boolean;
    })[];
    activeLesson: typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
    } | undefined;
    activeLessonPercentage: number;
};

export const Unit = ({
    id,
    order,
    title,
    description,
    lessons,
    activeLesson,
    activeLessonPercentage
}: Props) => {
    return (
        <div>
            <UnitBanner title={title} description={description}/>
            <div className="flex items-center flex-col relative">
                {lessons.map((lesson, index) => {
                    const isCurrent = true || lesson.id === activeLesson?.id;
                    const isLocked = !lesson.completed && !isCurrent;
                    return (
                        <LessonButton
                            key={lesson.id}
                            id={lesson.id}
                            index={index}
                            totalCount={lessons.length -1}
                            current={isCurrent}
                            locked={isLocked}
                            percentage={activeLessonPercentage}
                        />
                    );
                })}
            </div>
        </div>
    )
}