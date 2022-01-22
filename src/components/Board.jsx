import { useEffect, useState } from "react";
import "../index.css";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const Board = () => {
  const [boardColors, setBoardColors] = useState([]);

  const createBoard = () => {
    const randomColors = [];
    for (let i = 0; i < width * width; i++) {
      let randomIndex = Math.floor(Math.random() * candyColors.length);
      let randomColor = candyColors[randomIndex];
      randomColors.push(randomColor);
    }
    setBoardColors(randomColors);
  };

  useEffect(() => {
    createBoard();
  }, []);

  return (
    <div className="app">
      <div className="game">
        {boardColors.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
