import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebarItem";

type Props = {
    className?: string;
};

export const SideBar = ({ className }:Props)  => {
    return (
        <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/mascot.svg"  height={50} width={50} alt="Mascot"/>
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
                        HojoZei Quest
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label="学ぶ" iconSrc="/learn.svg" href={"/learn"}/>
                <SidebarItem label="スコア" iconSrc="/medal.svg" href={"/leaderboard"}/>
                <SidebarItem label="攻略" iconSrc="/quests.svg" href={"/quests"}/>
                <SidebarItem label="お店" iconSrc="/shop.svg" href={"/shop"}/>
            </div>
        </div>
    );
;}