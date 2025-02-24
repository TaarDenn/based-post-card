import "../../globals.css";
import { ImageResponse } from "next/og";
import { pixelLib } from "@/lib/pixelLibrary";

const SplashImage = () => {
  return (
    <div tw="w-full h-full flex flex-col items-center justify-center bg-[#0052ff] text-white font-pixel">
      <div tw="flex bg-inherit">
        {pixelLib.gift.map((col, i) => (
          <div key={`col-${i}`} tw="bg-[#0052ff] flex flex-col">
            {col.map((b, j) => (
              <div
                key={`col-${j}`}
                style={{
                  backgroundColor: b === "inherit" ? "#ff000000" : b,
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
  return new ImageResponse(<SplashImage />, {
    width: 320,
    height: 320,
  });
}
