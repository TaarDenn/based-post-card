import { contract } from "@/contract/contract";
export default function Footer() {
  return (
    <div className="text-xs py-4">
      <p className="text-center">Contract Address:</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="block break-all text-[#0052ff] hover:text-[#0052ff]/80 w-full text-center"
        href={`https://basescan.org/address/${contract.address}`}
      >
        {contract.address}
      </a>
      <p className="w-full text-center">Made by @taardenn with ❤️ on Base</p>
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-zinc-700 hover:text-zinc-700/60"
          href="https://x.com/intent/follow?screen_name=taardenn"
        >
          @TaarDenn on X
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-violet-600 hover:text-violet-600/60"
          href="https://warpcast.com/taardenn"
        >
          @TaarDenn on Farcaster
        </a>
      </div>
    </div>
  );
}
