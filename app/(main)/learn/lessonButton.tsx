"use client";

import { Check, Star, Crown } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { cn } from "@/lib/utils";
import "react-circular-progressbar/dist/styles.css"
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
    id: number;
    index: number;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
}

export const LessonButton = ({
    id,
    index,
    totalCount,
    locked,
    current,
    percentage
}: Props) => {
    const buttonNum = 8;
    const buttonIndex = index % buttonNum; // 画面左から見た時の位置

    let indentaitonLevel;

    if(buttonIndex <= 2) {
        indentaitonLevel = buttonIndex;
    } else if (buttonIndex <= 4) {
        indentaitonLevel = 4 - buttonIndex;
    } else if (buttonIndex <= 6 ) {
        indentaitonLevel = 4 - buttonIndex;
    } else {
        indentaitonLevel = buttonIndex - 8;
    }

    const rightPosition = indentaitonLevel * 40;

    const isFirst = index === 0;
    const isLast = index === totalCount;
    const isCompleted = !current && !locked;
    const Icon = isCompleted ? Check : isLast ? Crown : Star;
    const href = isCompleted ? `/lesson/${id}` : "/lesson";

    return (
            <Link href={href} aria-disabled={locked}
                style={{ pointerEvents: locked ? "none" : "auto" }}>
                <div className="relative" style={{
                    right: `${rightPosition}px`, marginTop: isFirst && !isCompleted ? 60 : 24,
                }}>
                    { current ? (
                        <div className="h-[102px] w-[102px] relative">
                            <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-400 bg-white rounded-xl animate-bounce tracking-wide z-10">
                                Start
                                <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2">
                                </div>
                            </div>
                            <CircularProgressbarWithChildren
                                value={Number.isNaN(percentage) ? 0 : percentage}
                                styles={{
                                    path: {
                                        stroke: "#4ade80"
                                    },
                                    trail: {
                                        stroke: "#e5e7eb"
                                    }
                                }}
                            >
                                <Button
                                    size="rounded"
                                    variant={locked ? "locked" : "secondary"}
                                    className="h-[70px] w-[70px] border-b-8"
                                >
                                    <Icon
                                        className={cn("h-10 w-10", locked ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                                        : "fill-primary-foreground text-primary-foreground", isCompleted && "fill-none stroke-[4]")}
                                    />
                                </Button>
                            </CircularProgressbarWithChildren>
                        </div>
                    ) : (
                        <div>
                            Somthing
                        </div>
                    )}
                </div>
            </Link>
        );
}