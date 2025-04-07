import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { contract } from "@/contract/contract";
import { NumericFormat } from "react-number-format";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { simulateContract } from "@wagmi/core";
import { createMintArgs } from "@/lib/utils";
import TokenPreview from "./token-preview";
import Web3Button from "./web3-button";
import { config } from "@/providers/wagmi";
import {
  InsufficientFundsError,
  ContractFunctionRevertedError,
  ContractFunctionExecutionError,
} from "viem";

export default function MintModal({
  show,
  onClose,
  data,
  openDonationModal,
  shouldSimulate,
  isFrame,
}) {
  const { isConnected } = useAccount();
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

  const [wallet, setWallet] = useState("");
  const [name, setName] = useState("");
  const [eth, setEth] = useState(0);
  const [simulationError, setSimulationError] = useState("");
  const [isSimulating, setSimulating] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isError) setShowError(true);
  }, [isError]);

  useEffect(() => {
    if (isConfirmed) openDonationModal();
  }, [isConfirmed]);

  if (!show) return false;

  const handleChangeWallet = (val) => setWallet(val);

  const mint = async () => {
    setSimulationError("");
    setShowError(false);

    if (!wallet) {
      setSimulationError("Please enter your friend's EVM address");
      return;
    }
    if (eth === null || eth === undefined || eth.toString().trim() === "") {
      setSimulationError("Please enter the valid amount of ETH to send");
      return;
    }
    if (wallet.match(/0x[a-fA-F0-9]{40}/) === null) {
      setSimulationError("Please enter a valid EVM address");
      return;
    }

    setSimulating(true);

    const functionParams = createMintArgs(wallet, name, data, eth, "0.0005");

    try {
      if (shouldSimulate) {
        await simulateContract(config, {
          ...contract,
          functionName: "mintAndPost",
          ...functionParams,
        });
      }

      setSimulating(false);

      writeContract({
        ...contract,
        functionName: "mintAndPost",
        ...functionParams,
      });
    } catch (err) {
      setSimulating(false);

      const insufficientFundsError = err.walk(
        (err) => err instanceof InsufficientFundsError
      );

      if (insufficientFundsError instanceof InsufficientFundsError) {
        setSimulationError(
          `You don't have "${eth}" ETH to post with this card`
        );
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
        } else if (errorName === "OutOfPostcards") {
          setSimulationError("All Postcards are sent out!");
        } else {
          setSimulationError("Something happened! please try again later!");
        }
      }
    }
  };

  console.log(eth);
  return createPortal(
    <div className="pixel-font fixed top-0 left-0 w-full h-[100svh] overflow-y-auto bg-black/70 styled-scrollbar z-50 flex items-center jusitfy-center p-2">
      <div className="w-full max-w-[700px] mx-auto h-full bg-white border border-black p-2 flex flex-col items-center">
        <div className="flex w-full items-center bg-[#0052FF] pl-2 text-white">
          <h1 className="w-full flex-auto text-start">POST to fren</h1>
          <button className="p-2 hover:bg-white/20" onClick={onClose}>
            x
          </button>
        </div>
        <p className="text-xs">Post this to a fren!</p>
        <TokenPreview data={data} />
        <div className="mt-3 w-full text-xs">
          <label htmlFor="post-card-name">Name your post-card</label>
          <input
            name="post-card-name"
            value={name}
            className="w-full appearance-none rounded-none border border-black px-1 py-1"
            placeholder="With Love"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-3 w-full text-xs">
          <label htmlFor="evm-address">Fren address {"(or yourself)"}</label>
          <input
            name="evm-address"
            value={wallet}
            className="w-full appearance-none rounded-none border border-black px-1 py-1"
            placeholder="0xYour Friend EVM Address"
            onChange={(e) => handleChangeWallet(e.target.value)}
          />
        </div>
        <div className="mt-3 w-full text-xs">
          <label className="mt-4" htmlFor="eth">
            You can send ETH to the fren within this post-card!
          </label>
          <NumericFormat
            value={eth}
            onValueChange={(values) => setEth(values.floatValue)}
            className="w-full appearance-none rounded-none border border-black px-1 py-1"
            placeholder="0.1"
          />
        </div>
        <div className="mt-4 w-full text-xs">
          <p>Dev Address {"(If you need)"}</p>
          <p
            className="break-all hover:bg-blue-200 cursor-pointer border border-dashed border-black px-2"
            onClick={() =>
              handleChangeWallet("0x72DA5272B044c72a258dA0089c0Af53Be0ae5915")
            }
          >
            0x72DA5272B044c72a258dA0089c0Af53Be0ae5915
          </p>
        </div>
        <div className="w-full py-2 flex justify-center items-center">
          <Web3Button
            isFrame={isFrame}
            disabled={isPending || !isConnected || isSimulating}
            onClick={() => mint()}
            // onClick={() => openDonationModal(true)}
          >
            {isPending
              ? "Posting card..."
              : isSimulating
              ? "Simulating..."
              : "POST CARD"}
          </Web3Button>
        </div>
        {isConnected && (
          <p className="text-xs w-full text-center text-zinc-500">
            with A little 0.0005 eth to support dev
          </p>
        )}
        {hash && (
          <div className="break-all text-center text-xs">
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
          <div className="text-blue-400 text-center text-xs">
            Waiting for confirmation...
          </div>
        )}
        {isConfirmed && (
          <div className="text-emerald-500 text-center text-xs">
            Transaction confirmed.
          </div>
        )}
        {error && showError && (
          <div className="text-rose-500">
            Error: {error.shortMessage || error.message}
          </div>
        )}
        {simulationError && (
          <div className="text-rose-500">Error: {simulationError}</div>
        )}
      </div>
    </div>,
    document.body
  );
}
