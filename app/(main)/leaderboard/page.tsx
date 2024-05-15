import { redirect } from "next/navigation";
import { StickyWrapper } from "@/components/stickyWrapper"
import { UserProgress } from "@/components/userProgress"
import { getUserProgress, getUserSubscription } from "@/db/queries"
import { FeedWrapper } from "@/components/feedWrapper";
import Image from "next/image";
import { getTopTenUsers } from '../../../db/queries';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Promo from "@/components/promo";
import Quests from "@/components/quests";

const LeaderBoardPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const usersRankingData = getTopTenUsers(); 

    const [ userProgress, userSubscription, usersRanking ] = await Promise.all([
        userProgressData, userSubscriptionData, usersRankingData
    ]);

    if(!userProgress || !userProgress.activeCourse) {
        redirect("/course");
    }
    const isPro = !!userSubscription?.isActive;
    return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
        activeCourse={userProgress.activeCourse}
        hearts={userProgress.hearts}
        points={userProgress.points}
        hasActiveSubscriotion={isPro}
        />
        {!isPro && (
          <Promo />
        )}
        <Quests points={userProgress.points}/>

      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
            <Image
            src="/medal.svg"
            alt="LeaderBoard"
            height={90}
            width={90}
            />
            <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Your Score & Rank
            </h1>
            <p className="text-muted-foreground text-center text-lg mb-6">
                コミュニティ内のあなたの順位
            </p>
            <Separator className="mb-4 h-0.5 rounded-full"/>
            {usersRanking.map((userProgress, index) => {
              return (
                <div key={userProgress.userId}
                className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
                >
                  <p className="font-bold mr-4">{index + 1}</p>
                  <Avatar className="bg-green-500 h-12 w-12 ml-3 mr-6">
                    <AvatarImage
                    src={userProgress.userImageSrc}
                    className="object-cover"
                    />
                  </Avatar>
                  <p className="font-bold text-neutral-500 flex-1">
                    {userProgress.userName}
                  </p>
                  <p className="text-muted-foreground">
                    {userProgress.points} XP
                  </p>
                </div>
              )
            })}
        </div>
      </FeedWrapper>
    </div>
  )
}

export default LeaderBoardPage
