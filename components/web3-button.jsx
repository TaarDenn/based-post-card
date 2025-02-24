import { useChains } from "wagmi";
import { useAccount } from "wagmi";
import ConnectWalletBar from "./connect-wallet/connect-wallet-bar";

export default function Web3Button({ children, className, ...props }) {
  const chains = useChains();
  const { chainId, isConnected } = useAccount();

  if (!isConnected) return <ConnectWalletBar />;
  if (chainId !== chains[0].id) return <ConnectWalletBar />;

  return (
    <button
      className={`disabled:bg-zinc-300 w-full px-2 py-1 bg-[#0052FF] hover:bg-[#0052FF]/80 text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
