import Link from "next/link";
import { course } from "@/db/schema";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

type Props = {
    activeCourse: typeof course.$inferSelect;
    hearts: number;
    points: number;
    hasActiveSubscriotion: boolean;
}

export const UserProgress = ({ activeCourse, hearts, points, hasActiveSubscriotion }: Props ) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/course">
                <Button variant="ghost">
                    <Image src={activeCourse.imageSrc} alt={activeCourse.title}
                    className="rounded-md border" width={36} height={36}/>
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-orange-500">
                    <Image src="points.svg" height={30} width={30} alt="Points" className="mr-2"/>
                    {points}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-rose-500">
                    <Image src="heart.svg" height={30} width={30} alt="Hearts" className="mr-2"/>
                    {hasActiveSubscriotion ? <InfinityIcon className="h-4 w-4 stroke-[3]"/> : hearts}
                </Button>
            </Link>
        </div>
    )
}