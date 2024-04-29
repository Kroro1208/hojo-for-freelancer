import { redirect } from "next/navigation"
import { FeedWrapper } from "@/components/feedWrapper"
import { StickyWrapper } from "@/components/stickyWrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/userProgress"
import { getUserProgress } from "@/db/queries"

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const [ userProgress ] = await Promise.all([userProgressData]);

  if(!userProgress || !userProgress.activeCourse) {
    redirect("/course");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
            <UserProgress
                activeCourse={{title: "Business", imageSrc: "/businessman.svg"}}
                hearts={5}
                points={10}
                hasActiveSubscriotion={false}
            />
        </StickyWrapper>
        <FeedWrapper>
            <Header title="起業" />
        </FeedWrapper>
    </div>
  )
}

export default LearnPage
 