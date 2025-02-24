"use client";
import { useState, useEffect } from "react";
import BasedGift from "../BasedGift";
import Wagmi from "@/providers/WagmiProvider";
import sdk from "@farcaster/frame-sdk";

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
    <main className="pixel-font">
      <Wagmi>
        <BasedGift />
      </Wagmi>
    </main>
  );
}
