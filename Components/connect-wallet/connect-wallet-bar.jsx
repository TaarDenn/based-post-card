import { useAccount } from "wagmi";
import ConnectRegularWallet from "./connect-regular-wallet";
import ConnectSmartWallet from "./smartwallet-connect";

export default function ConnectWalletBar() {
  const { isConnected } = useAccount();
  return (
    <div className="text-lg flex gap-2 justify-center w-full py-2 last:pb-0 text-xs">
      <div className={isConnected ? "w-1/2 h-8" : "w-1/2 h-8"}>
        <ConnectRegularWallet />
      </div>
      {!isConnected && (
        <div className="w-1/2">
          <ConnectSmartWallet />
        </div>
      )}
    </div>
  );
}
