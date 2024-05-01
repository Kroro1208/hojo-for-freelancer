import { redirect } from "next/navigation"
import { lessons, units as unitsSchema } from "@/db/schema"
import { FeedWrapper } from "@/components/feedWrapper"
import { StickyWrapper } from "@/components/stickyWrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/userProgress"
import { getCourseProgress, getUnits, getUserProgress } from "@/db/queries"
import { Unit } from "./unit"
import { getLessonPercentage } from '../../../db/queries';

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const getLessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();

  const [ userProgress, units, courseProgress, lessonPercentage ] = await Promise.all([userProgressData, unitsData, courseProgressData, getLessonPercentageData]);

  if(!userProgress || !userProgress.activeCourse) {
    redirect("/course");
  }

  if(!courseProgress) {
    redirect("/course");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
            <UserProgress
                activeCourse={userProgress.activeCourse}
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscriotion={false}
            />
        </StickyWrapper>
        <FeedWrapper>
            <Header title={userProgress.activeCourse.title} />
            { units.map((unit) => (
              <div key={unit.id} className="mb-10">
                <Unit 
                  id={unit.id}
                  order={unit.order}
                  title={unit.title}
                  description={unit.description}
                  lessons={unit.lessons}
                  activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                    unit: typeof unitsSchema.$inferSelect;
                  } | undefined }
                  activeLessonPercentage={lessonPercentage}
                />
              </div>
            ))}
        </FeedWrapper>
    </div>
  )
}

export default LearnPage