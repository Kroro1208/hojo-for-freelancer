"use client"
import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";

type Props = {
    initialLessonId: number;
    initialPercentage: number;
    initialHearts: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        comleted: boolean;
        challengeOptions: typeof challengeOptions. $inferSelect[];
    })[];
    userSubscriptions: any;
}

export const Quiz = ({
    initialLessonId,
    initialPercentage,
    initialHearts,
    initialLessonChallenges,
    userSubscriptions
}: Props) => {
    const [ hearts, setHearts ] = useState(50 || initialHearts);
    const [ percentage, setPercentage ] = useState(50 || initialPercentage);

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscriptions?.isActive}
      />
    </>
  )
}