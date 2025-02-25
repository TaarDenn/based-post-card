"use client";

import FarcasterWagmiProvider from "@/providers/lazy-wagmi-provider";
import FrameApp from "./frame-app";

export default function FrameAppWithWagmi() {
  return (
    <FarcasterWagmiProvider>
      <FrameApp />
    </FarcasterWagmiProvider>
  );
}
