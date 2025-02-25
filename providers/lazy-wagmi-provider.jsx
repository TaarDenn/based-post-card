"use client";

// import dynamic from "next/dynamic";
import { WagmiProvider } from "@/providers/wagmi-provider";
// const LazyWagmi = dynamic(() => import("@/providers/wagmi-provider"), {
//   ssr: false,
// });

export default function Provider({ children }) {
  //   return <LazyWagmi>{children}</LazyWagmi>;
  return <WagmiProvider>{children}</WagmiProvider>;
}
