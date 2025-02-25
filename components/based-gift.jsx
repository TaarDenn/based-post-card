"use client";

import { useState, useLayoutEffect, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { defaultCanvas as defaultCanvasReference } from "@/lib/defaultCanvas";
import MintModal from "@/components/mint-modal";
import Navbar from "@/components/navbar";
import DonationModal from "@/components/donation-modal";
import PortfolioModal from "@/components/portfolio";
import { getWidth, hexColorToRgb } from "@/lib/utils";
import PixelLib from "@/components/pixel-lib";
import Footer from "@/components/footer";

const aspectRatio = 6 / 4;

const dc = structuredClone(defaultCanvasReference);

export default function BasedGift({ isFrame = false, shouldSimulate = false }) {
  const [bytes, setBytes] = useState(dc.bytes);
  const [bg, setBg] = useState(dc.bg);
  const [brush, setBrush] = useState("#ffffff");
  const [showEditor, setShowEditor] = useState(false);
  const [drawMode, setDrawMode] = useState("paint");
  const [drawDisabled, setDrawDisabled] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [selectedElement, setSelectedElement] = useState("pixelCanvas");
  const [inputs, setInputs] = useState(dc.inputs);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pixelCanvasPos, setPixelCanvasPos] = useState(dc.pixelCanvasPos);
  const [warning, setWarning] = useState(false);
  const [firstTap, setFirstTap] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showLibModal, setShowLibModal] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const canvas = useRef(null);
  const pixelCanvas = useRef(null);
  const textNode_1 = useRef(null);
  const textNode_2 = useRef(null);
  const textNode_3 = useRef(null);

  const textNodesRefs = [textNode_1, textNode_2, textNode_3];

  const canvasHeight = canvasWidth * aspectRatio;

  const annoColor = (() => {
    const rgb = hexColorToRgb(bg);

    for (let i = 0; i < 3; i++) {
      if (rgb[i] > 150) return "#000000";
    }

    return "#ffffff";
  })();

  useLayoutEffect(() => {
    const resize = () => setCanvasWidth(canvas.current.clientWidth);
    window.addEventListener("resize", resize);

    resize();

    return () => window.removeEventListener("resize", resize);
  }, []);

  // Calculate the actual width of inputs
  useEffect(() => {
    if (inputs.length === 0) return;
    if (inputs.every((input) => input.width)) return;

    const _inputs = structuredClone(inputs);

    for (let i = 0; i < _inputs.length; i++) {
      if (!_inputs[i].width) {
        _inputs[i].width = getWidth(document.getElementById(`input-${i}`));
      }
    }

    setInputs(_inputs);
  }, [inputs]);

  const openDonationModal = () => {
    setShowModal(false);
    setShowDonationModal(true);
  };

  const paint = (i, j) => {
    const _bytes = [...bytes];
    _bytes[i][j] = brush;
    setBytes(_bytes);
  };

  const erase = (i, j) => {
    const _bytes = [...bytes];
    _bytes[i][j] = "inherit";
    setBytes(_bytes);
  };

  const onPaint = (i, j) => {
    if (drawDisabled) return;
    if (selectedElement !== "pixelCanvas") return;
    drawMode === "paint" ? paint(i, j) : erase(i, j);
  };

  const addText = () => {
    if (inputs.length === 3) return;

    setInputs((prev) => [
      ...prev,
      {
        x: (Math.random() * 3).toFixed() / 10,
        y: (Math.random() * 3).toFixed() / 10,
        color: "#ffffff",
        value: "",
        width: 26,
      },
    ]);
  };

  const removeText = (i) => {
    const _inputs = structuredClone(inputs);
    _inputs.splice(i, 1);

    setInputs(_inputs);
    setSelectedElement("pixelCanvas");
  };

  const onChangeInput = (e, i) => {
    const _inputs = structuredClone(inputs);
    _inputs[i].value = e.target.value;

    let fittedWidth;

    fittedWidth = getWidth(document.getElementById(`input-${i}`));

    if (fittedWidth < 26) fittedWidth = 26;
    _inputs[i].width = fittedWidth;

    setInputs(_inputs);
  };

  const handleDragInputs = (ui, i) => {
    const _inputs = structuredClone(inputs);

    const { x, y } = _inputs[i];

    _inputs[i].x = (x * canvasWidth + ui.deltaX) / canvasWidth;
    _inputs[i].y = (y * canvasHeight + ui.deltaY) / canvasHeight;

    setInputs(_inputs);
  };

  const clear = () => {
    setBytes(Array.from({ length: 8 }, () => Array(8).fill("inherit")));
    setInputs([{ x: 0.5, y: 0.1, color: "#ffffff", value: "", width: 31 }]);
  };

  const handleDragPixelCanvas = (_, ui) => {
    const { x, y } = pixelCanvasPos;

    setPixelCanvasPos({
      x: (x * canvasWidth + ui.deltaX) / canvasWidth,
      y: (y * canvasHeight + ui.deltaY) / canvasHeight,
    });
  };

  const getSelectedElementColor = () => {
    if (!selectedElement) return;
    else if (selectedElement === "pixelCanvas") return brush;
    else if (selectedElement === "bg") return bg;
    else return inputs[Number(selectedElement.charAt(4))].color;
  };

  const setSelectedElementColor = (color) => {
    if (!selectedElement) return;
    else if (selectedElement === "pixelCanvas") setBrush(color);
    else if (selectedElement === "bg") setBg(color);
    else {
      const _inputs = structuredClone(inputs);
      _inputs[Number(selectedElement.charAt(4))].color = color;
      setInputs(_inputs);
    }
  };

  const existingPalette = (() => {
    const textPalette = inputs.map((text) => text.color);

    const drawingPalette = bytes
      .flat()
      .map((c) => c !== "inherit" && c)
      .filter((c) => c);

    return [...new Set([bg, ...textPalette, ...drawingPalette])];
  })();

  const openInEditor = (data) => {
    const _data = structuredClone(data);
    setInputs(_data.inputs);
    setBytes(_data.bytes);
    setBg(_data.bg);
  };

  return (
    <div className="bg-white w-full h-[100svh] flex justify-center items-center">
      <div className="w-full h-full">
        <MintModal
          isFrame={isFrame}
          shouldSimulate={shouldSimulate}
          show={showModal}
          onClose={() => setShowModal(false)}
          data={{ bg, bytes, inputs, pixelCanvasPos }}
          openDonationModal={openDonationModal}
        />
        <DonationModal
          shouldSimulate={shouldSimulate}
          show={showDonationModal}
          onClose={() => setShowDonationModal(false)}
        />
        <PixelLib
          show={showLibModal}
          onClose={() => setShowLibModal(false)}
          setter={setBytes}
        />
        <PortfolioModal
          show={showPortfolio}
          onClose={() => setShowPortfolio(false)}
          setter={openInEditor}
        />
        <div className="w-full flex items-center justify-center sm:w-[calc(100%-220px)] h-[100svh]">
          <div className="h-[100svh] w-[410px] sm:w-full overflow-y-auto flex justify-center styled-scrollbar ">
            <div id="editor-container" className="flex w-[410px] h-[100svh]">
              <div
                id="canvas-container"
                className="w-full max-w-[410px] mx-auto sm:mx-0"
              >
                <Navbar isFrame={isFrame} />
                <div className="w-full border border-black">
                  <div className="p-2">
                    <div
                      id="canvas"
                      ref={canvas}
                      style={{
                        backgroundColor: bg,
                        height: `${canvasHeight}px`,
                      }}
                      className="relative border border-black w-full max-w-[400px]"
                    >
                      {!firstTap && (
                        <div
                          onClick={() => {
                            setFirstTap(true);
                            setShowEditor(true);
                          }}
                          className="absolute top-0 left-0 w-full h-full z-10"
                        ></div>
                      )}
                      {showEditor && (
                        <>
                          <div className="absolute top-0 left-0 flex w-full h-full">
                            <div
                              style={{ borderColor: annoColor }}
                              className="h-full w-1/2 border-r-[1px] border-dashed opacity-30"
                            ></div>
                          </div>
                          <div className="absolute top-0 left-0 flex w-full h-full">
                            <div
                              style={{ borderColor: annoColor }}
                              className="h-1/2 w-full border-b-[1px] border-dashed opacity-30"
                            ></div>
                          </div>
                        </>
                      )}
                      {inputs.map((inp, i) => (
                        <Draggable
                          key={`text-${i}`}
                          bounds="parent"
                          handle=".handle"
                          onDrag={(_, ui) => handleDragInputs(ui, i)}
                          onStart={() => setSelectedElement(`text${i}`)}
                          onStop={() => setDrawDisabled(false)}
                          nodeRef={textNodesRefs[i]}
                          position={{
                            x: inp.x * canvasWidth,
                            y: inp.y * canvasHeight,
                          }}
                        >
                          <div ref={textNodesRefs[i]} className="absolute">
                            <Handle
                              annoColor={annoColor}
                              show={showEditor}
                              isRemovable={true}
                              onRemove={() => removeText(i)}
                            />
                            <input
                              id={`input-${i}`}
                              onFocus={() => setSelectedElement(`text${i}`)}
                              style={{
                                color: inp.color,
                                width: inp.width,
                                // With mono width fonts we can something like this
                                // inp.value.length < 3
                                //   ? "3ch"
                                //   : `${inp.value.length}ch`,
                                fontSize: `${canvasWidth / 20}px`,
                                outlineWidth: "1px",
                                outlineStyle:
                                  showEditor && selectedElement === `text${i}`
                                    ? "dashed"
                                    : "none",
                                outlineColor: annoColor,
                              }}
                              value={inp.value}
                              className="bg-inherit"
                              placeholder={`${showEditor ? "..." : ""}`}
                              onChange={(e) => onChangeInput(e, i)}
                            />
                          </div>
                        </Draggable>
                      ))}

                      <Draggable
                        bounds="parent"
                        nodeRef={pixelCanvas}
                        handle=".handle"
                        onDrag={handleDragPixelCanvas}
                        onStart={() => setDrawDisabled(true)}
                        onStop={() => setDrawDisabled(false)}
                        position={{
                          x: pixelCanvasPos.x * canvasWidth,
                          y: pixelCanvasPos.y * canvasHeight,
                        }}
                      >
                        <div
                          ref={pixelCanvas}
                          className="absolute"
                          onClick={() => setSelectedElement("pixelCanvas")}
                        >
                          <Handle show={showEditor} annoColor={annoColor} />
                          <div
                            id="pixel-canvas"
                            style={{ outlineColor: annoColor }}
                            className={`flex ${
                              selectedElement !== "pixelCanvas" &&
                              "hover:outline"
                            }`}
                          >
                            {bytes.map((_, i) => (
                              <div key={`col-${i}`}>
                                {Array.from({ length: 8 }).map((_, j) => (
                                  <div
                                    key={`col-${j}`}
                                    style={{
                                      backgroundColor: bytes[i][j],
                                      width: `${canvasWidth / 20}px`,
                                      height: `${canvasWidth / 20}px`,
                                      borderColor: annoColor + "aa",
                                    }}
                                    className={`${
                                      showEditor &&
                                      selectedElement === "pixelCanvas" &&
                                      "border-[0.5px]"
                                    } ${
                                      !drawDisabled &&
                                      selectedElement === "pixelCanvas" &&
                                      "hover:border-2"
                                    }`}
                                    onClick={() => onPaint(i, j)}
                                    onPointerMove={(e) =>
                                      e.buttons === 1 && onPaint(i, j)
                                    }
                                  ></div>
                                ))}
                              </div>
                            ))}
                          </div>
                          {/* <div className="text-xs text-zinc-300">
                        {(pixelCanvasPos.x * canvasWidth).toFixed(0)},
                        {(pixelCanvasPos.y * canvasHeight).toFixed(0)}
                      </div> */}
                        </div>
                      </Draggable>
                    </div>
                  </div>
                  <div
                    role="toolbar"
                    aria-orientation="horizontal"
                    className="px-2 pb-2 flex flex-wrap justify-between text-xs"
                  >
                    <button
                      className="border border-black px-2 hover:bg-blue-200"
                      onClick={() => setShowEditor(!showEditor)}
                    >
                      {showEditor ? "Hide Editor" : "Show Editor"}
                    </button>

                    <button
                      disabled={inputs.length === 3}
                      className="disabled:bg-white disabled:border-zinc-400 disabled:text-zinc-400 border border-black px-[6px] hover:bg-blue-200"
                      onClick={addText}
                    >
                      + TEXT
                    </button>
                    <div>
                      <button
                        onClick={() => setDrawMode("erase")}
                        className={`${
                          drawMode === "erase"
                            ? "bg-[#0052ff] text-white"
                            : "bg-white text-black hover:bg-blue-200"
                        } border border-black px-[6px]`}
                      >
                        Erase
                      </button>
                      <button
                        onClick={() => setDrawMode("paint")}
                        className={`${
                          drawMode === "paint"
                            ? "bg-[#0052ff] text-white"
                            : "bg-white text-black hover:bg-blue-200"
                        } border border-black px-[6px]`}
                      >
                        Paint
                      </button>
                    </div>
                    <div>
                      {!warning && (
                        <button
                          className="border border-black px-2 hover:bg-rose-200 text-rose-500 border-rose-500"
                          onClick={() => setWarning(true)}
                        >
                          Clear
                        </button>
                      )}
                      {warning && (
                        <>
                          <button
                            className="border border-black px-2 hover:bg-rose-200 text-rose-500 border-rose-500"
                            onClick={() => {
                              clear();
                              setWarning(false);
                            }}
                          >
                            Sure!
                          </button>
                          <button
                            className="border border-black px-2 hover:bg-blue-200 text-[#0052ff] border-[#0052ff]"
                            onClick={() => setWarning(false)}
                          >
                            No!
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    role="toolbar"
                    aria-orientation="horizontal"
                    className="px-2 text-xs py-2 border-t border-black flex flex-wrap justify-between text-sm"
                  >
                    <button
                      className="border border-black px-2 w-1/2 hover:bg-blue-200"
                      onClick={() => setShowPortfolio(true)}
                    >
                      My Inbox
                    </button>

                    <button
                      className="w-1/2 disabled:bg-white disabled:border-zinc-400 disabled:text-zinc-400 border border-black px-[6px] hover:bg-blue-200"
                      onClick={() => setShowLibModal(true)}
                    >
                      Library
                    </button>
                  </div>
                </div>
                <div className="border-x border-b border-black flex items-center justify-center p-2">
                  <button
                    className="w-full bg-[#0052FF] text-white flex justify-center p-2 hover:bg-[#0052FF]/80"
                    onClick={() => setShowModal(true)}
                  >
                    POST to fren
                  </button>
                </div>
                <footer className="w-full">
                  <Footer />
                </footer>
              </div>
            </div>
          </div>
          <div className="relative">
            <button
              className={`sm:hidden bg-yellow-300 hover:bg-yellow-200 shadow-[5px_5px] fixed w-12 h-20 z-20 border border-black top-0 ${
                drawerOpen ? "right-[220px] transition-[right]" : "right-0"
              }`}
              onClick={() => {
                setDrawerOpen(!drawerOpen);
                setFirstTap(true);
                setShowEditor(true);
              }}
            >
              {drawerOpen ? "Close" : "Tools"}
            </button>

            <div
              className={`color-picker bg-white fixed h-full top-0 right-0 ${
                drawerOpen
                  ? "transition-[margin-right] mr-0 sm:mr-0"
                  : "-mr-[220px] sm:mr-0"
              } flex flex-col items-center border border-black p-2 w-[220px]`}
            >
              <div className="flex w-full">
                <div className="border h-6 text-zinc-400 border-black basis-1/2 px-2 text-sm">
                  {selectedElement === "pixelCanvas" && "Brush Color"}
                  {selectedElement === "bg" && "Bg Color"}
                  {selectedElement?.slice(0, 4) === "text" && "Text Color"}
                </div>
                <button
                  onClick={() => setSelectedElement("bg")}
                  className={`text-sm h-6 border border-black basis-1/2 ${
                    selectedElement === "bg"
                      ? "text-white bg-[#0052ff]"
                      : "text-black bg-white"
                  }`}
                >
                  Set bg color
                </button>
              </div>
              <HexColorPicker
                color={getSelectedElementColor()}
                onChange={setSelectedElementColor}
              />
              <div className="bg-white w-full flex gap-1 border border-black px-1 my-2">
                <span>#</span>
                <HexColorInput
                  className="bg-white outline-none w-full"
                  color={getSelectedElementColor()}
                  onChange={setSelectedElementColor}
                />
              </div>
              <div className="h-full w-full overflow-y-auto border border-black px-2 text-sm">
                <h3 className="sticky top-0 bg-white">
                  Working palette {"(Used)"}
                </h3>
                <div>
                  {existingPalette.map((c, i) => (
                    <div
                      role="button"
                      aria-label={`change color to ${c}`}
                      onClick={() => setSelectedElementColor(c)}
                      className="my-1 hover:bg-blue-200 flex items-center gap-2 w-full border border-black px-2"
                      key={`palette-${i}`}
                    >
                      <div
                        style={{ background: c }}
                        className="border w-4 h-4"
                      ></div>
                      <div>{c}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Handle = ({ show, isRemovable = false, onRemove, annoColor }) => {
  return (
    <>
      {show ? (
        <div
          role="toolbar"
          aria-orientation="horizontal"
          className="mb-1 handle flex gap-1 items-center justify-start h-4"
        >
          <div
            style={{ color: annoColor, borderColor: annoColor }}
            className="cursor-move hover:after:content-['move'] after:text-xs after:absolute after:-top-5 flex items-center justify-center border border-black w-4 h-4"
          >
            -
          </div>
          {isRemovable && onRemove && (
            <button
              style={{ color: annoColor, borderColor: annoColor }}
              onClick={onRemove}
              className="hover:after:content-['delete'] hover:after:absolute hover:after:text-xs hover:after:-top-5 flex items-center pb-[2px] justify-center border border-black w-4 h-4"
            >
              x
            </button>
          )}
        </div>
      ) : (
        <div aria-hidden={true} className="mb-1 w-4 h-4"></div>
      )}
    </>
  );
};
