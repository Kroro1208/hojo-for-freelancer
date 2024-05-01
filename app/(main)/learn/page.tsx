import { redirect } from "next/navigation"
import { FeedWrapper } from "@/components/feedWrapper"
import { StickyWrapper } from "@/components/stickyWrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/userProgress"
import { getUnits, getUserProgress } from "@/db/queries"

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();

  const [ userProgress, units ] = await Promise.all([userProgressData, unitsData]);

  if(!userProgress || !userProgress.activeCourse) {
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
                {JSON.stringify(unit)}
              </div>
            ))}
        </FeedWrapper>
    </div>
  )
}

export default LearnPage