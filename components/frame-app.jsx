"use client";

import dynamic from "next/dynamic";

const FramedBasedGift = dynamic(
  () => import("@/components/framed-based-gift"),
  {
    ssr: false,
  }
);

export default function FrameApp() {
  return (
    <main className="pixel-font h-[100svh]">
      <FramedBasedGift isFrame={true} />
    </main>
  );
}
