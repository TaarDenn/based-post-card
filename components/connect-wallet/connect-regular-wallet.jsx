import { useAccount, useSwitchChain, useChains } from "wagmi";

import { ConnectKitButton } from "connectkit";
export default function ConnectRegularWallet() {
  const { chainId } = useAccount();
  const chains = useChains();

  return (
    <div className="w-full h-full">
      <ConnectKitButton.Custom>
        {({ isConnected, show, address, ensName }) => {
          if (isConnected && chainId !== chains[0].id) {
            return <SwithToBase />;
          }
          return (
            <button
              className="border hover:bg-blue-200 border-black px-2 h-full w-full items-center justify-center flex"
              onClick={show}
            >
              {!isConnected
                ? "Connect"
                : ensName
                ? ensName
                : address.slice(0, 4) + "..." + address.slice(38, 42)}
            </button>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  );
}

const SwithToBase = () => {
  const { switchChain } = useSwitchChain();
  const chains = useChains();
  return (
    <button
      className="w-full border border-black h-full flex items-center justify-center px-2"
      onClick={() => switchChain({ chainId: chains[0].id })}
    >
      Switch to Base
    </button>
  );
};
