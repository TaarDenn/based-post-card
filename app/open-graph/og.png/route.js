import "../../globals.css";
import { ImageResponse } from "next/og";
import { pixelLib } from "@/lib/pixelLibrary";

const OpenGraphImage = () => {
  return (
    <div tw="w-full h-full flex flex-col items-center justify-center bg-[#0052ff] text-white font-pixel">
      <h1 tw="text-6xl">POST-CARD.FUN</h1>
      <p tw="text-2xl">Post Handcrafted CARD NFT to your frens.</p>
      <div tw="flex bg-inherit">
        {pixelLib.nouns.map((_, i) => (
          <div key={`col-${i}`} tw="bg-[#0052ff] flex flex-col">
            {Array.from({ length: 8 }).map((_, j) => (
              <div
                key={`col-${j}`}
                style={{
                  backgroundColor:
                    pixelLib.nouns[i][j] === "inherit"
                      ? "#ff000000"
                      : pixelLib.nouns[i][j],
                  width: `${400 / 20}px`,
                  height: `${400 / 20}px`,
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// export const contentType = "image/png";

export async function GET(request) {
  return new ImageResponse(<OpenGraphImage />, {
    width: 1200,
    height: 630,
  });
}
