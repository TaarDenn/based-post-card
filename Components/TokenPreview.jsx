import { useRef, useLayoutEffect, useState } from "react";
import Draggable from "react-draggable";

export default function TokenPreview({ data }) {
  const [previewWidth, setPreviewWidth] = useState(100);
  const [previewHeight, setPreviewHeight] = useState(150);

  const canvas = useRef(null);

  const textNode_1 = useRef(null);
  const textNode_2 = useRef(null);
  const textNode_3 = useRef(null);

  const pixelCanvas = useRef(null);

  const textNodesRefs = [textNode_1, textNode_2, textNode_3];

  useLayoutEffect(() => {
    const resize = () => {
      if (window.innerWidth < 640) {
        setPreviewWidth(100);
        setPreviewHeight(150);
      }
      if (window.innerWidth >= 640) {
        setPreviewWidth(200);
        setPreviewHeight(300);
      }
    };
    window.addEventListener("resize", resize);

    resize();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="w-[100px] h-[150px] sm:w-[200px] sm:h-[300px]">
      <div
        id="canvas"
        ref={canvas}
        style={{
          backgroundColor: data.bg,
          height: `${previewHeight}px`,
        }}
        className="relative border border-black w-full max-w-[400px]"
      >
        {data.inputs.map((inp, i) => (
          <Draggable
            key={`text-${i}`}
            bounds="parent"
            nodeRef={textNodesRefs[i]}
            position={{
              x: inp.x * previewWidth,
              y: inp.y * previewHeight,
            }}
          >
            <div className="absolute" ref={textNodesRefs[i]}>
              <p
                style={{
                  color: inp.color,
                  width: inp.width,
                  fontSize: `${previewWidth / 20}px`,
                }}
                className="bg-inherit"
              >
                {inp.value}
              </p>
            </div>
          </Draggable>
        ))}

        <Draggable
          bounds="parent"
          nodeRef={pixelCanvas}
          position={{
            x: data.pixelCanvasPos.x * previewWidth,
            y: data.pixelCanvasPos.y * previewHeight,
          }}
        >
          <div className="absolute" ref={pixelCanvas}>
            <div id="pixel-canvas" className="flex">
              {data.bytes.map((_, i) => (
                <div key={`col-${i}`}>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <div
                      key={`col-${j}`}
                      style={{
                        backgroundColor: data.bytes[i][j],
                        width: `${previewWidth / 20}px`,
                        height: `${previewWidth / 20}px`,
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  );
}
