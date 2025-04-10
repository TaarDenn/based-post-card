import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: "PostCard",
      preference: "all",
    }),
  ],
  transports: {
    [base.id]: http(),
  },
});
