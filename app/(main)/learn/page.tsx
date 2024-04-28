import { FeedWrapper } from "@/components/feedWrapper"
import { StickyWrapper } from "@/components/stickyWrapper"
import { Header } from "./header"

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
            Learn Page
        </StickyWrapper>
        <FeedWrapper>
            <Header title="Header" />
        </FeedWrapper>
    </div>
  )
}

export default LearnPage
 