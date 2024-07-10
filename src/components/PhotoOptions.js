import React, { useState, useEffect } from "react";

const PhotoOptions = ({ photo }) => {
  const [selectedOption, setSelectedOption] = useState("1in12");
  const [photoGrid, setPhotoGrid] = useState(null);

  useEffect(() => {
    if (photo && selectedOption) {
      generatePhotoGrid(selectedOption);
    }
  }, [photo, selectedOption]);

  const generatePhotoGrid = (option) => {
    console.log(`Generating photo grid for option: ${option}`);
    const gridSize = getGridSize(option);
    if (!gridSize) return;

    const canvas = document.createElement("canvas");
    canvas.width = gridSize.width;
    canvas.height = gridSize.height;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = photo;

    img.onload = () => {
      const paddingX = 25; // เพิ่มระยะห่างแนวนอนระหว่างภาพ
      const paddingY = 25; // เพิ่มระยะห่างแนวตั้งระหว่างภาพ

      for (let row = 0; row < gridSize.rows; row++) {
        for (let col = 0; col < gridSize.cols; col++) {
          const x = col * (gridSize.cellWidth + paddingX);
          const y = row * (gridSize.cellHeight + paddingY);
          ctx.drawImage(img, x, y, gridSize.cellWidth, gridSize.cellHeight);
        }
      }
      setPhotoGrid(canvas.toDataURL());
    };
  };

  const getGridSize = (option) => {
    const dpi = 300;
    const inchToCm = 2.54;
    const cmToPx = (cm) => (cm / inchToCm) * dpi;

    switch (option) {
      case "1in12":
        return {
          width: cmToPx(10.16),
          height: cmToPx(15.24),
          rows: 4,
          cols: 3,
          cellWidth: cmToPx(2.54),
          cellHeight: cmToPx(3.0480),
          margin: cmToPx(1),
        };
      case "1in6":
        return {
          width: cmToPx(10.16),
          height: cmToPx(15.24),
          rows: 3,
          cols: 2,
          cellWidth: cmToPx(5),
          cellHeight: cmToPx(7),
          margin: cmToPx(0.2),
        };
      case "1_5in6":
        return {
          width: cmToPx(10.16),
          height: cmToPx(15.24),
          rows: 2,
          cols: 2,
          cellWidth: cmToPx(7.5),
          cellHeight: cmToPx(10.5),
          margin: cmToPx(0.2),
        };
      case "2in6":
        return {
          width: cmToPx(10.16),
          height: cmToPx(15.24),
          rows: 2,
          cols: 2,
          cellWidth: cmToPx(10),
          cellHeight: cmToPx(14),
          margin: cmToPx(0.2),
        };
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 m-2 border rounded ${
            selectedOption === "1in12" ? "bg-selected" : ""
          }`}
          onClick={() => setSelectedOption("1in12")}
        >
          1 in / 12 รูป
        </button>
        <button
          className={`px-4 py-2 m-2 border rounded ${
            selectedOption === "1in6" ? "bg-selected" : ""
          }`}
          onClick={() => setSelectedOption("1in6")}
        >
          1 in / 6 รูป
        </button>
        <button
          className={`px-4 py-2 m-2 border rounded ${
            selectedOption === "1_5in6" ? "bg-selected" : ""
          }`}
          onClick={() => setSelectedOption("1_5in6")}
        >
          1.5 in / 6 รูป
        </button>
        <button
          className={`px-4 py-2 m-2 border rounded ${
            selectedOption === "2in6" ? "bg-selected" : ""
          }`}
          onClick={() => setSelectedOption("2in6")}
        >
          2 in / 6 รูป
        </button>
      </div>
      <div className="border rounded-lg h-64 flex items-center justify-center mb-4 blurred-background">
        {photoGrid ? (
          <div className="relative">
            <img
              src={photoGrid}
              alt="Generated Grid"
              className="w-full h-auto border-4 border-white rounded-lg shadow-lg"
            />
          </div>
        ) : (
          "พื้นที่สำหรับแสดงภาพตัวอย่าง"
        )}
      </div>
      <div className="flex justify-center space-x-4">
        <button className="px-4 py-2 border rounded">ดาวน์โหลด</button>
        <button className="px-4 py-2 border rounded">ปริ้น</button>
      </div>
    </div>
  );
};

export default PhotoOptions;
