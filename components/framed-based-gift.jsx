"use client";

import BasedGift from "./based-gift";
import { useState, useEffect } from "react";
import sdk from "@farcaster/frame-sdk";

export default function FramedBasedGift({ isFrame }) {
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

  // if (!isSDKLoaded) {
  //   return (
  //     <div className="text-sm w-full h-full flex flex-col items-center justify-center">
  //       <p>It seems you are not using farcaster!</p>
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="text-blue-400 hover:text-blue-200"
  //       >
  //         Use Browser app
  //       </a>
  //     </div>
  //   );
  // }

  return <BasedGift isFrame={isFrame} shouldSimulate={false} />;
}
