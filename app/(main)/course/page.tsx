import { getCourse } from "@/db/queries";
import { List } from "./list";

const CoursePage = async() => {
    const course = await getCourse();
    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Course Page
            </h1>
            <List
                course={course}
                activeCourseId={1}
            />
        </div>
    );
};

export default CoursePage;