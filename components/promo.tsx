"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image
          src="/unlimited.gif"
          alt="Promo"
          height={30}
          width={30}
          />
          <h3 className="font-bold text-md">Upgrade to Pro</h3>
        </div>
        <p className="text-muted-foreground">無限ハートを手にいれる</p>
      </div>
        <Button variant="super" className="w-full" size="lg" asChild>
          <Link href="/shop">
            アップグレードする
          </Link>
        </Button>
    </div>
  )
}

export default Promo
