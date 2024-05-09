"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useExitModal } from "@/store/useModal";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const ExitModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useExitModal();

    useEffect(()=> setIsClient(true), []);

    if(!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                            src="/sad3.svg"
                            alt="Mascot-sad"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        まだレッスンが終わってません！
                    </DialogTitle>
                    <DialogDescription className="text-center font-light text-sm">
                        本当にレッスンを終了しますか？
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary"
                            className="w-full"
                            size="lg"
                            onClick={close}
                        >
                            学習を続ける
                        </Button>
                        <Button variant="dangerOutline"
                            className="w-full"
                            size="lg"
                            onClick={() => {
                                close();
                                router.push("/learn");
                            }}
                        >
                            ここで終了する
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};