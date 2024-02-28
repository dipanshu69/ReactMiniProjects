import React, { useEffect, useState } from "react";
import "./index.css";

const RandomColor = () => {
  const [color, setColor] = useState("#FF69B4");
  const [typeOfColor, setTypeOfColor] = useState("");

  const handleHexClick = () => {
    setTypeOfColor("Hex")
    let hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      let num = hex[Math.floor(Math.random() * hex.length)];
      hexColor += num;
    }
    setColor(hexColor);
  };

  const handleRgbClick = () => {
    setTypeOfColor("RGB")
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setColor(`rgb(${r},${g},${b})`);
  };

//   useEffect(() => {
//     if(typeOfColor === "RGB") handleRgbClick();
//     else handleHexClick();
//   }, [typeOfColor]);

  return (
    <div style={{ backgroundColor: `${color}` }} className="main">
      <div className="container">
        <button onClick={handleHexClick}>Change Background Hex</button>
        <button
        onClick={typeOfColor === "Hex" ? handleHexClick : handleRgbClick}
      >
        Generate Random Color
      </button>
        <button onClick={handleRgbClick}>Change Background RGB</button>
       
      </div>
      <div style={{marginTop : '25px'}}>
        <h1>
          {typeOfColor === "Hex"
            ? `Color = HexColor(${color})`
            : `Color = RGBColor(${color})`}
        </h1>
      </div>
    </div>
  );
};

export default RandomColor;
