"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

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
  return (
    <ul className="w-full">
        <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
            <Image
            src="/love.svg"
            alt="Hearts"
            height={40}
            width={40}
            />
            <div className="flex-1">
                <p className="text-neutral-700 text-base lg:text-xl font-bold">
                    ハートを補充する
                </p>
            </div>
            <Button
            disabled={hearts === 5}
            >
                {hearts === 5 ? "補充する" :(
                    <div className="flex items-center">
                        <Image
                        src="/points.svg"
                        alt="Points"
                        height={40}
                        width={40}
                        />
                        <p>
                            50
                        </p>
                    </div>
                )}
            </Button>
        </div>
    </ul>
  )
}

export default Items
