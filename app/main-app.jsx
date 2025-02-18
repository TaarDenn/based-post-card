"use client";

import Wagmi from "@/providers/WagmiProvider";
import BasedGift from "./BasedGift";

export default function MainApp() {
  return (
    <main className="pixel-font ">
      <Wagmi>
        <BasedGift />
      </Wagmi>
    </main>
  );
}
