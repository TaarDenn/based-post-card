import {
  useAccount,
  useSwitchChain,
  useChains,
  useConnect,
  useDisconnect,
  useEnsName,
} from "wagmi";
import { ConnectKitButton } from "connectkit";
import { frameconfig } from "@/providers/wagmi-frame-provider";

export default function ConnectRegularWallet({ isFrame = false }) {
  const { chainId, address, isConnected } = useAccount();
  const chains = useChains();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName(address);

  // if (isFrame) {
  //   return (
  //     <div className="w-full h-full">
  //       <button
  //         className="border hover:bg-blue-200 border-black px-2 h-full w-full items-center justify-center flex"
  //         onClick={() =>
  //           isConnected
  //             ? disconnect()
  //             : connect({ connector: frameconfig.connectors[0] })
  //         }
  //       >
  //         {!isConnected
  //           ? "Connect"
  //           : ensName
  //           ? ensName
  //           : address.slice(0, 4) + "..." + address.slice(-4)}
  //       </button>
  //     </div>
  //   );
  // }

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
                : address.slice(0, 4) + "..." + address.slice(-4)}
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
