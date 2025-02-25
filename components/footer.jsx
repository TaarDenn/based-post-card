import { contract } from "@/contract/contract";

export default function Footer() {
  return (
    <div className="text-xs py-4 flex flex-col items-center justify-center pb-4">
      <p>Contract Address:</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-[#0052ff] hover:text-[#0052ff]/80"
        href={`https://basescan.org/address/${contract.address}`}
      >
        {contract.address}
      </a>
      <p>Made by @taardenn with ❤️ on Base</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="py-1 text-zinc-700 hover:text-zinc-700/60"
        href="https://x.com/intent/follow?screen_name=taardenn"
      >
        @TaarDenn on X
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="py-1 text-violet-600 hover:text-violet-600/60"
        href="https://warpcast.com/taardenn"
      >
        @TaarDenn on Farcaster
      </a>
    </div>
  );
}
