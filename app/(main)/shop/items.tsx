"use client";

import { toast } from "sonner";
import { refillHearts } from "@/actions/userProgress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";

const POINTS_TO_REFILL = 10;

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}

const Items = ({
    hearts,
    points,
    hasActiveSubscription
}: Props) => {
    const [pending, startTransition] = useTransition();
    const onRefillHearts = () => {
        if(pending || hearts === 5 || points < POINTS_TO_REFILL){
            return;
        }
        startTransition(() => {
            refillHearts().catch(() => toast.error('エラーが発生しました'))
        });
    }
  return (
    <ul className="w-full">
        <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
            <Image
            src="/hearts.svg"
            alt="Hearts"
            height={30}
            width={30}
            />
            <div className="flex-1">
                <p className="text-neutral-700 text-base lg:text-lg font-bold">
                    ポイントを使ってハートを補充
                </p>
            </div>
            <Button
            onClick={onRefillHearts}
            disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
            >
                {hearts === 5 ? "補充する" :(
                    <div className="flex items-center gap-2">
                        <Image
                        src="/points.svg"
                        alt="Points"
                        height={20}
                        width={20}
                        />
                        <p>
                            {POINTS_TO_REFILL}
                        </p>
                    </div>
                )}
            </Button>
        </div>
    </ul>
  )
}

export default Items
