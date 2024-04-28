import Image from "next/image";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] mb-8 lg:mb-0">
        <Image src="/sword2.svg" fill alt="Hero"/>
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-2xl font-bold text-neutral-600 max-w-[480px] text-center">
          楽しく学んでお金に強くなる！<br/>フリーランスのための税金攻略ゲーム
        </h1>
        <div>
          <ClerkLoading>
            <Loader className="w-5 h-5 animate-spin text-muted-foreground"/>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton mode="modal" fallbackRedirectUrl="/learn">
                <Button size="lg" variant="secondary" className="w-full">
                  攻略を始める
                </Button>
              </SignInButton>
              <SignUpButton mode="modal" fallbackRedirectUrl="/learn">
                <Button size="lg" variant="primaryOutline" className="w-full">
                  すでにアカウントを持っています
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/learn">
                  攻略を続ける              
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
