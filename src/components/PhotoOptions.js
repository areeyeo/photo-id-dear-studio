import React, { useState, useEffect, useCallback } from "react";

const PhotoOptions = ({ photo }) => {
  const [selectedOption, setSelectedOption] = useState("1in12");
  const [photoGrid, setPhotoGrid] = useState(null);
  const [canvasData, setCanvasData] = useState(null);

  const generatePhotoGrid = useCallback((option) => {
    console.log(`Generating photo grid for option: ${option}`);
    const gridSize = getGridSize(option);
    if (!gridSize) return;

    const canvas = document.createElement("canvas");
    canvas.width = gridSize.width;
    canvas.height = gridSize.height;
    const ctx = canvas.getContext("2d");

    // Set the background color to white
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = photo;

    img.onload = () => {
      const paddingX = gridSize.paddingX;
      const paddingY = gridSize.paddingY;

      const totalWidth =
        gridSize.cols * gridSize.cellWidth + (gridSize.cols - 1) * paddingX;
      const totalHeight =
        gridSize.rows * gridSize.cellHeight + (gridSize.rows - 1) * paddingY;
      const offsetX = (gridSize.width - totalWidth) / 2;
      const offsetY = option === "1in6" ? 30 : option === "1_5in6" ? 30 : (gridSize.height - totalHeight) / 2;

      for (let row = 0; row < gridSize.rows; row++) {
        for (let col = 0; col < gridSize.cols; col++) {
          const x = offsetX + col * (gridSize.cellWidth + paddingX);
          const y = offsetY + row * (gridSize.cellHeight + paddingY);

          const aspectRatio = img.width / img.height;
          const cellAspectRatio = gridSize.cellWidth / gridSize.cellHeight;
          let drawWidth, drawHeight, drawOffsetX, drawOffsetY;

          if (aspectRatio > cellAspectRatio) {
            drawWidth = gridSize.cellWidth;
            drawHeight = drawWidth / aspectRatio;
            drawOffsetX = 0;
            drawOffsetY = (gridSize.cellHeight - drawHeight) / 2;
          } else {
            drawHeight = gridSize.cellHeight;
            drawWidth = drawHeight * aspectRatio;
            drawOffsetX = (gridSize.cellWidth - drawWidth) / 2;
            drawOffsetY = 0;
          }

          ctx.drawImage(
            img,
            x + drawOffsetX,
            y + drawOffsetY,
            drawWidth,
            drawHeight
          );
        }
      }
      setPhotoGrid(canvas.toDataURL());
      setCanvasData(canvas);
    };
  }, [photo]);

  useEffect(() => {
    if (photo && selectedOption) {
      generatePhotoGrid(selectedOption);
    }
  }, [photo, selectedOption, generatePhotoGrid]);

  const getGridSize = (option) => {
    const dpi = 300;
    const inchToCm = 2.54;
    const cmToPx = (cm) => (cm / inchToCm) * dpi;
    const paperWidth = 10.16; // 4 inches
    const paperHeight = 15.24; // 6 inches

    switch (option) {
      case "1in12":
        return {
          width: cmToPx(paperWidth),
          height: cmToPx(paperHeight),
          rows: 4,
          cols: 3,
          cellWidth: cmToPx(paperWidth / 3) - cmToPx(0.5),
          cellHeight: cmToPx(paperHeight / 4) - cmToPx(0.5),
          paddingX: cmToPx(0.5),
          paddingY: cmToPx(0.5),
        };
      case "1in6":
        return {
          width: cmToPx(paperWidth),
          height: cmToPx(paperHeight),
          rows: 2,
          cols: 3,
          cellWidth: cmToPx(paperWidth / 3) - cmToPx(0.5),
          cellHeight: cmToPx(paperHeight / 4) - cmToPx(0.5),
          paddingX: cmToPx(0.5),
          paddingY: cmToPx(0.5),
        };
      case "1_5in6":
        return {
          width: cmToPx(paperWidth),
          height: cmToPx(paperHeight),
          rows: 3,
          cols: 2,
          cellWidth: cmToPx(paperWidth / 2) - cmToPx(0.5),
          cellHeight: cmToPx(paperHeight / 3) - cmToPx(0.5),
          paddingX: cmToPx(0.5),
          paddingY: cmToPx(0.5),
        };
      case "2in6":
        return {
          width: cmToPx(paperWidth),
          height: cmToPx(paperHeight),
          rows: 2,
          cols: 2,
          cellWidth: cmToPx(paperWidth / 2) - cmToPx(0.5),
          cellHeight: cmToPx(paperHeight / 2) - cmToPx(0.5),
          paddingX: cmToPx(0.5),
          paddingY: cmToPx(0.5),
        };
      default:
        return null;
    }
  };

  const downloadImage = () => {
    if (canvasData) {
      canvasData.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "photo_grid.jpg";
        a.click();
        URL.revokeObjectURL(url);
      }, "image/jpeg", 1.0);
    }
  };

  const printImage = () => {
    if (canvasData) {
      const imgData = canvasData.toDataURL("image/jpeg");
      const windowContent = `<html><body><img src="${imgData}" style="width:100%; height:100%"></body></html>`;
      const printWin = window.open("", "", "width=800,height=600");
      printWin.document.open();
      printWin.document.write(windowContent);
      printWin.document.close();
      printWin.focus();
      printWin.print();
      printWin.close();
    }
  };

  const resetOptions = () => {
    setSelectedOption("");
    setPhotoGrid(null);
    setCanvasData(null);
  };

  return (
    <div className="p-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
      <div className="flex justify-center mb-4">
        <button
          className="px-4 py-2 m-2 border rounded"
          onClick={resetOptions}
          style={{ zIndex: 10 }}
        >
          Reset
        </button>
        <button
          className={`px-4 py-2 m-2 border rounded ${
            selectedOption === "1in12" ? "bg-selected" : ""
          }`}
          onClick={() => setSelectedOption("1in12")}
          style={{ zIndex: 10 }}
        >
          1 in / 12 รูป
        </button>
        <button
          className={`px-4 py-2 m-2 border rounded ${
            selectedOption === "1in6" ? "bg-selected" : ""
          }`}
          onClick={() => setSelectedOption("1in6")}
          style={{ zIndex: 10 }}
        >
          1 in / 6 รูป
        </button>
        <button
          className={`px-4 py-2 m-2 border rounded ${
            selectedOption === "1_5in6" ? "bg-selected" : ""
          }`}
          onClick={() => setSelectedOption("1_5in6")}
          style={{ zIndex: 10 }}
        >
          1.5 in / 6 รูป
        </button>
        <button
          className={`px-4 py-2 m-2 border rounded ${
            selectedOption === "2in6" ? "bg-selected" : ""
          }`}
          onClick={() => setSelectedOption("2in6")}
          style={{ zIndex: 10 }}
        >
          2 in / 6 รูป
        </button>
      </div>
      <div
        className="border flex items-center justify-center mb-4 blurred-background"
        style={{ height: "500px", backgroundColor: "#f0e8f6" }}
      >
        {photoGrid ? (
          <div className="relative">
            <img
              src={photoGrid}
              alt="Generated Grid"
              className="w-full h-auto max-w-full max-h-full"
              style={{ transform: "scale(0.5)", transformOrigin: "center" }}
            />
          </div>
        ) : (
          "พื้นที่สำหรับแสดงภาพตัวอย่าง"
        )}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          className="px-4 py-2 bg-white bg-opacity-75 rounded-lg shadow-lg border border-gray-300"
          onClick={downloadImage}
          style={{ zIndex: 10 }}
        >
          ดาวน์โหลด
        </button>
        <button
          className="px-4 py-2 bg-white bg-opacity-75 rounded-lg shadow-lg border border-gray-300"
          onClick={printImage}
          style={{ zIndex: 10 }}
        >
          ปริ้น
        </button>
      </div>
    </div>
  );
};

export default PhotoOptions;
