import { useState } from "react";
import { useReadContracts, useAccount } from "wagmi";
import { contract } from "@/contract/contract";
import TokenPreview from "./TokenPreview";
import { convertTokenToPreviewData } from "@/lib/utils";
import { createPortal } from "react-dom";

export default function PortfolioModal({ show, onClose, setter }) {
  const { isConnected } = useAccount();

  if (!show) return false;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-[100dvh] bg-black/70 z-30 pixel-font flex items-center jusitfy-center p-2">
      <div className="w-full max-w-[700px] mx-auto h-full bg-white border border-black p-2">
        <div className="flex w-full items-center bg-[#0052FF] pl-2 text-white">
          <h1 className="w-full flex-auto text-start">INBOX</h1>
          <button className="p-2 hover:bg-white/20" onClick={onClose}>
            x
          </button>
        </div>
        <div className="relative h-[calc(100%-40px)]">
          {!isConnected ? (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-black/50">
              Please Connect wallet first
            </div>
          ) : (
            <Portfolio onClose={onClose} setter={setter} />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

const Portfolio = ({ onClose, setter }) => {
  const [tab, setTab] = useState("recieved");

  const { address } = useAccount();

  const { data, error, isSuccess, isPending } = useReadContracts({
    contracts: [
      {
        ...contract,
        functionName: "getRecievedCardsOf",
        args: [address],
      },
      {
        ...contract,
        functionName: "getSentCardsOf",
        args: [address],
      },
    ],
  });

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-rose-500">
        Error: {error.shortMessage || error.message}
      </div>
    );
  }

  const [recieved, sent] = data || [];

  return (
    <div className="w-full h-full">
      <div role="tablist" className="w-full p-2 h-12">
        <button
          className={`border border-black w-1/2 ${
            tab === "recieved"
              ? "text-white bg-[#0052FF]"
              : "text-black hover:bg-blue-200"
          }`}
          onClick={() => setTab("recieved")}
        >
          Revieved
        </button>
        <button
          className={`border border-black w-1/2 ${
            tab === "sent"
              ? "text-white bg-[#0052FF]"
              : "text-black hover:bg-blue-200"
          }`}
          onClick={() => setTab("sent")}
        >
          Sent
        </button>
      </div>
      {isPending && (
        <div className="w-full h-full flex items-center justify-center">
          Loading...
        </div>
      )}
      {/* {error && (

      )} */}
      {isSuccess && (
        <div className="absolute w-full h-full">
          {tab === "recieved" && (
            <Recieved
              onClose={onClose}
              setter={setter}
              postcards={recieved.result}
            />
          )}
          {tab === "sent" && (
            <Sent onClose={onClose} setter={setter} postcards={sent.result} />
          )}
        </div>
      )}
    </div>
  );
};
const Recieved = ({ postcards, onClose, setter }) => {
  if (!postcards) {
    return (
      <div className="w-full h-full flex items-center justify-center text-rose-500">
        Error: Please change your VPN/Proxy setting.
      </div>
    );
  }

  const convertedPostcards = postcards.map((postcard) =>
    convertTokenToPreviewData(postcard)
  );

  return (
    <div className="w-full h-[calc(100%-60px)] overflow-y-auto overflow-x-hidden">
      <div className="w-full flex flex-wrap items-center justify-center gap-4">
        {convertedPostcards.length === 0 && (
          <p className="text-zinc-500 text-sm">Nothing yet</p>
        )}
        {convertedPostcards.length > 0 &&
          convertedPostcards.map((postcard, i) => (
            <div
              key={`gift-${i}`}
              className="w-[218px] border border-black p-2"
            >
              <TokenPreview data={postcard} />
              <p className="text-xs">{postcard.name}</p>
              <p className="text-xs">
                Sender:{" "}
                <span className="break-all">{postcard.originalSender}</span>
              </p>
              <button
                onClick={() => {
                  setter(postcard);
                  onClose();
                }}
                className="text-xs border border-black w-full hover:bg-blue-200"
              >
                Open In Editor
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

const Sent = ({ postcards, onClose, setter }) => {
  if (!postcards) {
    return (
      <div className="w-full h-full flex items-center justify-center text-rose-500">
        Error: Please change your VPN/Proxy setting.
      </div>
    );
  }

  const convertedPostcards = postcards.map((postcard) =>
    convertTokenToPreviewData(postcard)
  );

  return (
    <div className="w-full h-[calc(100%-60px)] overflow-y-auto overflow-x-hidden">
      <div className="w-full flex flex-wrap items-center justify-center gap-4">
        {convertedPostcards.length === 0 && (
          <p className="text-zinc-500 text-sm">Nothing yet</p>
        )}
        {convertedPostcards.length > 0 &&
          convertedPostcards.map((postcard, i) => (
            <div
              key={`gift-${i}`}
              className="w-[218px] border border-black p-2"
            >
              <TokenPreview data={postcard} />
              <p className="text-xs">{postcard.name}</p>
              <p className="text-xs">
                Reciever:{" "}
                <span className="break-all">{postcard.originalReciever}</span>
              </p>
              <button
                onClick={() => {
                  setter(postcard);
                  onClose();
                }}
                className="text-xs border border-black w-full hover:bg-blue-200"
              >
                Open In Editor
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
