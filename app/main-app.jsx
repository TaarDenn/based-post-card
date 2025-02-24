"use client";

// import dynamic from "next/dynamic";
import BasedGift from "@/componentss/based-gift";
import Wagmi from "@/providers/wagmi-provider";
// const LazyWagmi = dynamic(() => import("../providers/wagmi-provider"), {
//   ssr: false,
// });

export default function MainApp() {
  return (
    <main className="pixel-font h-[100svh]">
      <Wagmi>
        <BasedGift />
      </Wagmi>
    </main>
  );
}
