"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useHeartsModal } from "@/store/useHeartsModal";

export const HeartsModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useHeartsModal();

    useEffect(()=> setIsClient(true), []);
    const onClick = () => {
        close();
        router.push("/store");
    }

    if(!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                            src="/sad2.svg"
                            alt="Mascot-sad2"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        ハートが全てなくなりました！
                    </DialogTitle>
                    <DialogDescription className="text-center font-light text-sm">
                        ハートを補充しますか？
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary"
                            className="w-full"
                            size="lg"
                            onClick={onClick}
                        >
                            ハート補充
                        </Button>
                        <Button variant="primaryOutline"
                            className="w-full"
                            size="lg"
                            onClick={() => {close}}
                        >
                            ここで終了する
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};