"use client";

import BasedGift from "@/components/based-gift";
import Wagmi from "@/providers/wagmi-provider";

export default function MainApp() {
  return (
    <main className="pixel-font h-[100svh]">
      <Wagmi>
        <BasedGift />
      </Wagmi>
    </main>
  );
}
