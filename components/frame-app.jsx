"use client";

import { useState, useEffect } from "react";
import sdk from "@farcaster/frame-sdk";
import dynamic from "next/dynamic";
import BasedGift from "./based-gift";

const LazyWagmi = dynamic(() => import("@/providers/wagmi-provider"), {
  ssr: false,
});

export default function FrameApp() {
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
      <LazyWagmi>
        <BasedGift isFrame={true} />
      </LazyWagmi>
    </main>
  );
}
