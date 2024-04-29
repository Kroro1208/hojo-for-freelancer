import { FeedWrapper } from "@/components/feedWrapper"
import { StickyWrapper } from "@/components/stickyWrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/userProgress"

const LearnPage = () => {
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
            <Header title="フリーランス" />
        </FeedWrapper>
    </div>
  )
}

export default LearnPage
 