import { pixelLib } from "./pixelLibrary";

// export const defaultCanvas = {
//   bg: "#0052ff",
//   inputs: [
//     { x: 0.22, y: 0.15, color: "#ffffff", value: "Happy Valentine's Day" },
//     { x: 0.36, y: 0.8, color: "#ffffff", value: "Tap to edit!" },
//   ],
//   bytes: pixelLib.gift,
//   pixelCanvasPos: { x: 0.3, y: 0.45 },
// };

export const defaultCanvas = {
  bg: "#0052ff",
  inputs: [
    { x: 0.45, y: 0.1, color: "#ffffff", value: "BOO!", width: 55 },
    { x: 0.36, y: 0.8, color: "#ffffff", value: "Tap to edit!", width: 112 },
  ],
  bytes: pixelLib.boo,
  pixelCanvasPos: { x: 0.3, y: 0.45 },
};
