import { useCallback } from "react";
import { useConnect } from "wagmi";
import SmartWalletLogo from "./smartwallet-logo";

export default function ConnectSmartWallet() {
  const { connectors, connect } = useConnect();

  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  return (
    <button
      className="flex h-8 items-center w-full border border-[#0052FF] bg-[#0052FF] hover:bg-[#0052FF]/80 justify-center gap-2 px-2 text-white h-full"
      onClick={createWallet}
    >
      <SmartWalletLogo />
      Create Wallet
    </button>
  );
}
