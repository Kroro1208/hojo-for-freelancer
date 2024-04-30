import { getCourse, getUserProgress } from "@/db/queries";
import { List } from "./list";

const CoursePage = async() => {
    const courseData = getCourse();
    const userProgressData = getUserProgress();

    const [ course, userProgress ] = await Promise.all([
        courseData, userProgressData
    ]);

    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                タイプ別コース
            </h1>
            <List
                course={course}
                activeCourseId={userProgress?.activeCourseId}
            />
        </div>
    );
};

export default CoursePage;