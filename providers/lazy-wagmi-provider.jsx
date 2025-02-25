"use client";

import dynamic from "next/dynamic";

const LazyWagmi = dynamic(() => import("@/providers/wagmi-provider"), {
  ssr: false,
});

export default function Provider({ children }) {
  return <LazyWagmi>{children}</LazyWagmi>;
}
