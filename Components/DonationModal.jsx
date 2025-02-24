import { useEffect, useState } from "react";
import { contract } from "@/contract/contract";
import { createPortal } from "react-dom";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { config } from "@/providers/wagmi";
import { simulateContract } from "@wagmi/core";
import {
  InsufficientFundsError,
  ContractFunctionRevertedError,
  ContractFunctionExecutionError,
  parseEther,
} from "viem";

import ConnectWalletBar from "./ConnectWallet/ConnectWalletBar";

export default function DonationModal({ show, onClose }) {
  const {
    data: hash,
    error,
    isError,
    isPending,
    writeContract,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const [simulationError, setSimulationError] = useState("");
  const [isSimulating, setSimulating] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isError) setShowError(true);
  }, [isError]);

  if (!show) return false;

  const donate = async (value) => {
    setSimulationError("");
    setShowError(false);

    setSimulating(true);

    const amount = parseEther(value, "wei");
    try {
      await simulateContract(config, {
        ...contract,
        functionName: "donateToDev",
        args: [amount],
        value: amount,
      });

      setSimulating(false);

      writeContract({
        ...contract,
        functionName: "donateToDev",
        args: [amount],
        value: amount,
      });
    } catch (err) {
      setSimulating(false);
      const insufficientFundsError = err.walk(
        (err) => err instanceof InsufficientFundsError
      );

      if (insufficientFundsError instanceof InsufficientFundsError) {
        setSimulationError(`You don't have enough ETH to donate`);
      }

      const revertError = err.walk(
        (err) => err instanceof ContractFunctionRevertedError
      );

      if (
        revertError instanceof ContractFunctionRevertedError ||
        revertError instanceof ContractFunctionExecutionError
      ) {
        const errorName = revertError.data?.errorName ?? "";

        if (errorName === "LowEth") {
          setSimulationError("You didn't send enough ETH to the contract");
        } else {
          setSimulationError("Something happened! please try again later!");
        }
      }
    }
  };

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-[100dvh] pixel-font bg-black/70 z-30 flex items-center jusitfy-center p-2">
      <div className="w-full max-w-[700px] mx-auto h-full max-h-[500px] bg-white border border-black p-2 flex flex-col items-center">
        <div className="flex w-full items-center bg-[#0052FF] pl-2 text-white">
          <h1 className="w-full flex-auto text-start">SUPPORT DEV</h1>
          <button className="p-2 hover:bg-white/20" onClick={onClose}>
            x
          </button>
        </div>
        <div className="w-full h-full flex flex-col items-center mt-2">
          <div className="bg-blue-100 pb-4 flex flex-col items-center px-2 w-full">
            <p className="text-emerald-400 text-sm py-2">
              Your card is successfully posted!
            </p>
            <h2 className="w-full text-center py-2 border text-sm">
              Donate DEV
            </h2>
            <div className="flex w-full gap-2 justify-center">
              <button
                disabled={isSimulating}
                onClick={() => donate("0.00001")}
                className="disabled:text-zinc-300 text-xs bg-[#0052ff] shadow-[3px_3px] shadow-black transition-all duration-200 hover:shadow-none text-white w-24 p-2 hover:bg-[#0052ff]/80"
              >
                0.0005 ETH
              </button>
              <button
                disabled={isSimulating}
                onClick={() => donate("0.005")}
                className="disabled:text-zinc-300 text-xs bg-[#0052ff] shadow-[3px_3px] shadow-black transition-all duration-200 hover:shadow-none text-white w-24 p-2 hover:bg-[#0052ff]/80"
              >
                0.005 ETH
              </button>

              <button
                disabled={isSimulating}
                onClick={() => donate("0.05")}
                className="disabled:text-zinc-300 text-xs bg-[#0052ff] shadow-[3px_3px] shadow-black transition-all duration-200 hover:shadow-none text-white w-24 p-2 hover:bg-[#0052ff]/80"
              >
                0.05 ETH
              </button>
            </div>
            <div className="text-xs mt-2">
              <p className="text-center text-blue-500">
                {isPending
                  ? "donating..."
                  : isSimulating
                  ? "Simulating..."
                  : ""}
              </p>
              {hash && (
                <div className="break-all">
                  Tx Hash:{" "}
                  <a
                    className="text-blue-400 underline"
                    href={`https://basescan.org/tx/${hash}`}
                  >
                    {hash.slice(0, 5)}...{hash.slice(60)}
                  </a>
                </div>
              )}

              {isConfirming && (
                <div className="text-blue-400 text-center">
                  Waiting for confirmation...
                </div>
              )}
              {isConfirmed && (
                <div className="my-2 text-emerald-500 text-center">
                  Thank you very much!
                </div>
              )}
              {error && showError && (
                <div className="text-rose-500 text-center">
                  Error: {error.shortMessage || error.message}
                </div>
              )}
              {simulationError && (
                <div className="text-rose-500 text-center">
                  Error: {simulationError}
                </div>
              )}
            </div>
          </div>
          <ConnectWalletBar />
          <div className="flex text-xs flex-col gap-2 items-center justify-center w-44 mt-12">
            Follow @TaarDenn on socials
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-black/80 text-white px-2 py-1 text-center w-full"
              href="https://x.com/intent/follow?screen_name=taardenn"
            >
              Follow on X
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="bg-violet-600 hover:bg-violet-600/80 text-white px-2 py-1 text-center w-full"
              href="https://warpcast.com/taardenn"
            >
              Follow on Farcaster
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
