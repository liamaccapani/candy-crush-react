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

  const checkColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let colorToCheck = boardColors[i];
      if (
        columnOfFour.every((square) => boardColors[square] === colorToCheck)
      ) {
        columnOfFour.forEach((square) => (boardColors[square] = ""));
      }
    }
  };

  const checkColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let colorToCheck = boardColors[i];
      if (
        columnOfThree.every((square) => boardColors[square] === colorToCheck)
      ) {
        columnOfThree.forEach((square) => (boardColors[square] = ""));
      }
    }
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnOfFour();
      checkColumnOfThree();
      setBoardColors([...boardColors]);
    }, 100);
    return () => clearInterval(timer);
  }, [checkColumnOfFour, checkColumnOfThree, boardColors]);

  console.log(boardColors);

  return (
    <div className="app">
      <div className="game">
        {boardColors.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            // alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
