"use client";

import dynamic from "next/dynamic";

const LazyWagmi = dynamic(() => import("@/providers/wagmi-frame-provider"), {
  ssr: false,
});

export default function LazyWagmiForFrameProvider({ children }) {
  return <LazyWagmi>{children}</LazyWagmi>;
}
