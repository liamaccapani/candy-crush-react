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

  const checkRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let colorToCheck = boardColors[i];
      const discard = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 61, 62, 63,
        // 5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        // 54, 55, 62, 63, 64,
      ];
      if (discard.includes(i)) continue;
      if (rowOfFour.every((square) => boardColors[square] === colorToCheck)) {
        rowOfFour.forEach((square) => (boardColors[square] = ""));
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

  const checkRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let colorToCheck = boardColors[i];
      const discard = [
        // 6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
      ];
      if (discard.includes(i)) continue;
      if (rowOfThree.every((square) => boardColors[square] === colorToCheck)) {
        rowOfThree.forEach((square) => (boardColors[square] = ""));
      }
    }
  };


  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnOfFour();
      checkRowOfFour();
      checkColumnOfThree();
      checkRowOfThree();
      setBoardColors([...boardColors]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkColumnOfFour,
    checkRowOfFour,
    checkColumnOfThree,
    checkRowOfThree,
    boardColors,
  ]);

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
