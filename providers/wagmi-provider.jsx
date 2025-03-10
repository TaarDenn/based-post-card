import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { createConfig, http } from "wagmi";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const queryClient = new QueryClient();
import { coinbaseWallet } from "wagmi/connectors";

const config = createConfig(
  getDefaultConfig({
    chains: [base],
    transports: {
      [base.id]: http(),
    },
    connectors: [
      farcasterFrame(),
      coinbaseWallet({
        appName: "PostCard",
        preference: "smartWalletOnly",
      }),
    ],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    appName: "PostCard",
    appDescription: "Post your hand-crafted NFT to a fren!",
    appUrl: "https://post-card.fun",
    appIcon: "https://post-card.fun/splash/splash.png",
  })
);

export default function Wagmi({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true));

  return (
    mounted && (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    )
  );
}
