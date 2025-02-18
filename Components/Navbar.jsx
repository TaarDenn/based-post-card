import ConnectWalletBar from "./ConnectWallet/ConnectWalletBar";

export default function Navbar() {
  return (
    <nav className="w-full text-lg flex justify-center">
      <div className="border-x border-t border-black text-center w-full p-2">
        <h1 className="bg-[#0052ff] text-white text-sm">
          POST-CARD | POST your handcrafted NFT CAD to a fren
        </h1>
        <ConnectWalletBar />
      </div>
      {/* <button onClick={() => console.log(bytes)}>export</button> */}
    </nav>
  );
}
