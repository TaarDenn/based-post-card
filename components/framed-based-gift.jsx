"use client";

import BasedGift from "./based-gift";
import { useState, useEffect } from "react";
import sdk from "@farcaster/frame-sdk";

export default function FramedBasedGift() {
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

  return <BasedGift isFrame={true} />;
}
