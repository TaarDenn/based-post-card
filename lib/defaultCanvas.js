import { pixelLib } from "./pixelLibrary";

const defaultCanvas_1 = {
  bg: "#0052ff",
  inputs: [
    { x: 0.45, y: 0.1, color: "#ffffff", value: "BOO!", width: 55 },
    { x: 0.36, y: 0.8, color: "#ffffff", value: "Tap to edit!", width: 112 },
  ],
  bytes: pixelLib.boo,
  pixelCanvasPos: { x: 0.3, y: 0.45 },
};

const defaultCanvas_2 = {
  bg: "#0052ff",
  inputs: [
    {
      x: 0.15,
      y: 0.1,
      color: "#ffffff",
      value: "What is the point of pixel art",
      width: 285,
    },
    {
      x: 0.18,
      y: 0.17,
      color: "#ffffff",
      value: "If you can't make a nouns?",
      width: 260,
    },
    { x: 0.36, y: 0.8, color: "#ffffff", value: "Tap to edit!", width: 112 },
  ],
  bytes: pixelLib.nouns,
  pixelCanvasPos: { x: 0.3, y: 0.45 },
};

export const defaultCanvas =
  Math.random() < 0.5 ? defaultCanvas_1 : defaultCanvas_2;

// export const defaultCanvas_3 = {
//   bg: "#0052ff",
//   inputs: [
//     { x: 0.22, y: 0.15, color: "#ffffff", value: "Happy Valentine's Day" },
//     { x: 0.36, y: 0.8, color: "#ffffff", value: "Tap to edit!" },
//   ],
//   bytes: pixelLib.gift,
//   pixelCanvasPos: { x: 0.3, y: 0.45 },
// };
