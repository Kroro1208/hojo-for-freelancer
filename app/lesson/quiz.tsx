"use client"
import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Header } from "./header";
import { QuestionBubble } from "./questionBubble";
import { Challenge } from "./challenge";
import Footer from "./footer";
import { upsertChallengeProgress } from "@/actions/challengeProgress";

type Props = {
    initialLessonId: number;
    initialPercentage: number;
    initialHearts: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
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
    const [ pending, startTransition] = useTransition();
    const [ hearts, setHearts ] = useState(initialHearts);
    const [ percentage, setPercentage ] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [ activeIndex, setActiveIndex ] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [ selectedOption, setSelectedOption ] = useState<number>();
    const [ status, setStatus ] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onNext = () => {
      setActiveIndex((current)=> current + 1);
    };

    const onSelect = (id: number) => {
      if(status !== "none") return;
      setSelectedOption(id);
    };

    const onContinue = () => {
      if(!selectedOption) return;

      if(status === "wrong") {
        setStatus("none");
        setSelectedOption(undefined);
        return;
      }
      if(status === "correct") {
        onNext();
        setSelectedOption(undefined);
        return;
      }
      
      const correctOption = options.find((option) => option.correct);
      if(!correctOption) {
        return;
      }

      if(correctOption.id === selectedOption) {
        startTransition(() => {});
        upsertChallengeProgress(challenge.id).then((response) => {
          if(response?.error === "hearts") {
            console.error("ハートが減りました");
            return;
          }
          setStatus("correct");
          setPercentage((prev)=> prev + 100 / challenges.length);
          if(initialPercentage === 100) {
            setHearts((prev) => Math.min(prev,+ 1, 5));
          }
        }).catch(()=> toast.error("エラーが発生しています。もう一度トライしてください"));
      } else {
        console.error("残念！");
      }
    };

    const title = challenge.type === "ASSIST"  ? "次の項目について最も適切な解を選択してください" : challenge.question;

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscriptions?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
            <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                    {title}
                </h1>
                <div>
                    {challenge.type === "ASSIST" && (
                        <QuestionBubble  question={challenge.question}/>
                    )}
                    <Challenge
                      options={options}
                      onSelect={onSelect}
                      status={status}
                      selectedOption={selectedOption}
                      disabled={false}
                      type={challenge.type}
                    />
                </div>
            </div>
        </div>
      </div>
      <Footer
        disabled={!selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  )
}