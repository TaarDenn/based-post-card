"use client";

import BasedGift from "@/components/based-gift";
import useWindowSize from "./use-windowsize";
import Wagmi from "@/providers/wagmi-provider";

export default function MainApp() {
  const { width } = useWindowSize();
  const shouldSimulate = width > 1024;

  return (
    <main className="pixel-font h-[100svh]">
      <Wagmi>
        <BasedGift shouldSimulate={shouldSimulate} />
      </Wagmi>
    </main>
  );
}
