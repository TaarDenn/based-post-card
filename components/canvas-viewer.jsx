const canvasWidth = 100;

export default function CanvasViewer({ bytes }) {
  return (
    <div className="flex">
      {bytes.map((_, i) => (
        <div key={`col-${i}`}>
          {Array.from({ length: 8 }).map((_, j) => (
            <div
              key={`col-${j}`}
              style={{
                backgroundColor: bytes[i][j],
                width: `${canvasWidth / 20}px`,
                height: `${canvasWidth / 20}px`,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
