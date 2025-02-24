"use client";

import { useState, useEffect } from "react";
import sdk from "@farcaster/frame-sdk";
import MainApp from "./main-app";

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

  return <MainApp />;
}
