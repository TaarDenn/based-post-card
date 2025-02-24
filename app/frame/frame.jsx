"use client";

import { useState, useEffect } from "react";
import BasedGift from "@/componentss/based-gift";
import sdk from "@farcaster/frame-sdk";
// import dynamic from "next/dynamic";
import Wagmi from "@/providers/wagmi-provider";
// const LazyWagmi = dynamic(() => import("../providers/wagmi-provider"), {
//   ssr: false,
// });

export default function Frame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  return (
    <main className="pixel-font h-[100svh]">
      <Wagmi>
        <BasedGift />
      </Wagmi>
    </main>
  );
}
