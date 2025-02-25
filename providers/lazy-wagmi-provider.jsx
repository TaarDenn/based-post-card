"use client";

// import dynamic from "next/dynamic";
import Wagmi from "@/providers/wagmi-provider";
// const LazyWagmi = dynamic(() => import("@/providers/wagmi-provider"), {
//   ssr: false,
// });

export default function Provider({ children }) {
  //   return <LazyWagmi>{children}</LazyWagmi>;
  return <Wagmi>{children}</Wagmi>;
}
