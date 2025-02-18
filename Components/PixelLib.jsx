import { pixelLib } from "@/lib/pixelLibrary";
import CanvasViewer from "./CanvasViewer";

export default function PixelLib({ show, onClose, setter }) {
  if (!show) return false;

  return (
    <div className="fixed w-full h-full bg-black/70 z-20 flex items-center jusitfy-center p-4">
      <div className="w-full max-w-[700px] mx-auto h-full bg-white border border-black p-4 flex flex-col items-center">
        <div className="flex w-full items-center bg-[#0052FF] pl-2 text-white">
          <h1 className="w-full flex-auto text-start">CHOOSE OR INSPIRE</h1>
          <button className="p-2 hover:bg-white/20" onClick={onClose}>
            x
          </button>
        </div>
        {Object.keys(pixelLib).map((art, i) => (
          <div
            className="w-full hover:bg-[#0052FF]/20 cursor-pointer flex border border-black my-1 p-1"
            key={`art-${i}`}
            onClick={() => {
              setter(structuredClone(pixelLib[art]));
              onClose();
            }}
          >
            <div className="bg-[#0052FF] w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] flex items-center justify-center p-2">
              <CanvasViewer bytes={pixelLib[art]} />
            </div>
            <p className="w-full flex items-center justify-center">{art}</p>
          </div>
        ))}
        <div>
          <h3 className="mt-4">Need for more 8x8 inspire?</h3>
          <p className="text-xs text-black/50 w-full text-center">
            Check thesse cool Reddit posts
          </p>
          <div className="text-xs flex flex-col w-full justify-center items-center mt-2">
            <a
              className="text-blue-400 hover:text-blue-200"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.reddit.com/r/PixelArt/comments/kzqite/oc_cute_8x8_pixel_art_with_max_3_colours_per/"
            >
              by computermaus256
            </a>
            <a
              className="text-blue-400 hover:text-blue-200"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.reddit.com/r/PixelArt/comments/fgjegc/100_famous_characters_in_8x8_pixels_w_pico8/"
            >
              by PixelProspector
            </a>
            <a
              className="text-blue-400 hover:text-blue-200"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.reddit.com/r/PixelArt/comments/103bznv/just_started_my_pixel_art_journey_i_heard_it_was/"
            >
              by Aldo_
            </a>
            <a
              className="text-blue-400 hover:text-blue-200"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.reddit.com/r/PixelArt/comments/lo2z3g/spiderman_and_71_more_characters_8x8_inspired_by/"
            >
              JacketLeast
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
