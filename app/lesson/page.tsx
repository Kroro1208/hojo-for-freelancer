import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const LessonPage = async () =>  {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const [ lesson, userProgress, userSubscription ] = await Promise.all([
        lessonData, userProgressData, userSubscriptionData
    ]);

    if(!lesson || !userProgress) {
        redirect('/learn');
    }

    // 1レッスン中の完了している数をlessonn数で割って何割完了しているかを計算
    const initialPercentage = lesson.challenges.filter((challenge) => challenge.completed)
    .length / lesson.challenges.length * 100;

  return (
    <Quiz
        initialLessonId={lesson.id}
        initialLessonChallenges={lesson.challenges}
        initialHearts={userProgress.hearts}
        initialPercentage={initialPercentage}
        userSubscription={userSubscription}
    />
  )
}

export default LessonPage;
