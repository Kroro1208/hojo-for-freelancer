import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const LessonPage = async () =>  {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();
    const [ lesson, userProgress ] = await Promise.all([
        lessonData, userProgressData
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
        userSubscriptions={null}
    />
  )
}

export default LessonPage;
