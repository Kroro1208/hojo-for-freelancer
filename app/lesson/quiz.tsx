"use client"
import { challengeOptions, challenges } from "@/db/schema";
import { upsertChallengeProgress } from "@/actions/challengeProgress";
import { reduceHearts } from "@/actions/userProgress";
import { useState, useTransition } from "react";
import Confetti from "react-confetti";
import { toast } from "sonner";
import { Header } from "./header";
import { QuestionTitle } from "./questionTitle";
import { Challenge } from "./challenge";
import Footer from "./footer";
import { useAudio, useWindowSize } from "react-use";
import Image from "next/image";
import ResultCard from "./resultCard";
import { useRouter } from "next/navigation";
import { useHeartsModal } from "@/store/useHeartsModal";

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
    const { open: openHeartsModal } = useHeartsModal();
    const { width, height} = useWindowSize();
    const router = useRouter();
    const [finishAudio] = useAudio({src: "/finish2.mp3", autoPlay: true})
    const [ correctAudio, _c, correctControls ] = useAudio({src: "/correct.mp3"});
    const [ incorrectAudio, _i, incorrectControls ] = useAudio({src: "/incorrect.mp3"});
    const [ pending, startTransition] = useTransition();
    const [ lessonId ] = useState(initialLessonId);
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
      setActiveIndex((current) => current + 1);
      window.location.reload(); 
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
        startTransition(()=> {
          upsertChallengeProgress(challenge.id)
          .then((response) => {
            if(response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            // レッスンを全てクリアした後の場合の復習(practice)
            if(initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          }).catch(()=> toast.error("エラーが発生しています。もう一度トライしてください"));
        });
      } else {
          startTransition(() => {
            reduceHearts(challenge.id).then((response)=> {
              if(response?.error === "hearts") {
                openHeartsModal();
                return;
              }
              incorrectControls.play();
              setStatus("wrong");

              if(!response?.error){
                setHearts((prev)=> Math.max(prev - 1, 0));
              }
            }).catch(()=> toast.error('エラーが発生しています。もう一度やり直してください'))
          });
        }
      };

      if(!challenge){
        return (
          <>
            {finishAudio}
            <Confetti width={width} height={height} recycle={false} numberOfPieces={500} tweenDuration={10000}/>
            <div className="flex fex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
              <Image src="/star.gif" alt="finish" className="hidden lg:block" height={100} width={100} />
              <Image src="/star.gif" alt="finish" className="block lg:hidden" height={50} width={50} />
              <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                よくできました！このレッスンは終了です！
              </h1>
              <div className="flex items-center gap-x-4 w-full">
                <ResultCard variant="points" value={challenges.length * 10}/>
                <ResultCard variant="hearts" value={hearts}/>
              </div>
            </div>
            <Footer lessonId={lessonId} status="completed" onCheck={() => router.push("/learn")}/>
          </>
        );
      }

    const title = challenge.type === "ASSIST" ? "次の項目について最も適切な解を選択してください" : challenge.question;
    return (
      <>
        {incorrectAudio}
        {correctAudio}
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
                          <QuestionTitle  question={challenge.question}/>
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
          disabled={pending || !selectedOption}
          status={status}
          onCheck={onContinue}
        />
      </>
    )
}