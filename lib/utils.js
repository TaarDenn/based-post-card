import { parseEther } from "viem";

export const hexColorToRgb = (hex) => {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return [parseInt(res[1], 16), parseInt(res[2], 16), parseInt(res[3], 16)];
};

export const getWidth = (input) => {
  const div = document.createElement("span");

  const copyStyle = getComputedStyle(input);

  for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop];
  }

  const value = input.value.replace(/ /g, "|");

  div.innerHTML = value;
  div.style.width = "auto";

  document.body.appendChild(div);

  const { width } = div.getBoundingClientRect();

  document.body.removeChild(div);

  return width;
};

export const createMintArgs = (
  wallet,
  name,
  data,
  giftAmount,
  donationAmount
) => {
  const bg = "0x" + data.bg.slice(1);

  const bytes = data.bytes.map((cols) =>
    cols.map((row) => {
      if (row === "inherit") return "0x00000000";
      else return "0x" + row.slice(1) + "ff";
    })
  );

  const texts = [];
  const textColors = [];
  const textPositions = [];

  // length of TextPositions & Texts & TextColors should be 3
  for (let i = 0; i < 3; i++) {
    if (data.inputs[i]) {
      texts.push(data.inputs[i].value);
      textColors.push("0x" + data.inputs[i].color.slice(1));
      textPositions.push({
        x: BigInt(Number((data.inputs[i].x * 400).toFixed(0))),
        y: BigInt(Number((data.inputs[i].y * 600).toFixed(0))),
      });
    } else {
      texts.push("");
      textColors.push("0x000000");
      textPositions.push({ x: 0n, y: 0n });
    }
  }

  const pixelCanvasPos = {
    x: BigInt(Number((data.pixelCanvasPos.x * 400).toFixed(0))),
    y: BigInt(Number((data.pixelCanvasPos.y * 600).toFixed(0))),
  };

  /**
   * Mint Params on contract
   */
  // address _to,
  // string calldata _name,
  // bytes3 _bg,
  // bytes4[8][8] calldata _pixelCanvas,
  // string[3] memory _texts,
  // bytes3[3] calldata _textColors,
  // Position calldata _pixelCanvasPosition,
  // Position[3] calldata _textPositions,
  // uint256 _giftAmount,
  // uint256 _donationAmount

  const value = parseEther(giftAmount.toString(), "wei");
  const donationValue = parseEther(donationAmount.toString(), "wei");

  return {
    args: [
      wallet,
      name,
      bg,
      bytes,
      texts,
      textColors,
      pixelCanvasPos,
      textPositions,
      value,
      donationValue,
    ],
    value,
  };
};

const bytesToColor = (bytes) => {
  if (!bytes.length || bytes.length < 8 || bytes.slice(8) === "00") {
    return "inherit";
  }

  return "#" + bytes.slice(2, 8);

  // if (str.length === 8) {
  //   if (str.slice(6) === "00") return "inherit";
  // }
};

export const convertTokenToPreviewData = (token) => {
  const inputs = [];
  const bytes = [];

  for (let i = 0; i < token.texts.length; i++) {
    if (token.texts[i].length === 0) continue;

    inputs.push({
      x: Number(token.textPositions[i].x) / 400,
      y: Number(token.textPositions[i].y) / 600,
      value: token.texts[i],
      color: bytesToColor(token.textColors[i]),
    });
  }

  for (let i = 0; i < token.pixelCanvas.length; i++) {
    const col = [];
    for (let j = 0; j < token.pixelCanvas[i].length; j++) {
      col.push(bytesToColor(token.pixelCanvas[i][j]));
    }
    bytes.push(col);
  }

  const pixelCanvasPos = {
    x: Number(token.pixelCanvasPosition.x) / 400,
    y: Number(token.pixelCanvasPosition.y) / 600,
  };

  return {
    name: token.name,
    bg: bytesToColor(token.bg),
    originalReciever: token.originalReciever,
    originalSender: token.originalSender,
    pixelCanvasPos,
    inputs,
    bytes,
  };
};
// bg
// :
// "0x0052ff"
// name
// :
// "1"
// originalReciever
// :
// "0x72DA5272B044c72a258dA0089c0Af53Be0ae5915"
// originalSender
// :
// "0x72DA5272B044c72a258dA0089c0Af53Be0ae5915"
// pixelCanvas
// :
// (8) [Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8)]
// pixelCanvasPosition
// :
// {x: 120n, y: 270n}
// textColors
// :
// (3) ['0xffffff', '0xffffff', '0x000000']
// textPositions
// :
// (3) [{…}, {…}, {…}]
// texts
// :
// (3) ['BOO!', 'Tap to edit!', '']
