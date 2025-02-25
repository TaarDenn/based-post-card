import ConnectWalletBar from "./connect-wallet/connect-wallet-bar";

export default function Navbar({ isFrame }) {
  return (
    <nav className="w-full text-lg flex justify-center">
      <div className="border-x border-t border-black w-full p-2">
        <h1 className="bg-[#0052ff] text-white text-sm w-full flex items-center justify-center">
          POST-CARD | POST your handcrafted NFT to a fren
        </h1>
        <ConnectWalletBar isFrame={isFrame} />
      </div>
    </nav>
  );
}
