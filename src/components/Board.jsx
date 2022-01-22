import { useEffect, useState } from "react";
import "../index.css";
import Blank from "../assets/candies/blank.png";
import BlueCandy from "../assets/candies/blue-candy.png";
import GreenCandy from "../assets/candies/green-candy.png";
import OrangeCandy from "../assets/candies/orange-candy.png";
import PurpleCandy from "../assets/candies/purple-candy.png";
import RedCandy from "../assets/candies/red-candy.png";
import YellowCandy from "../assets/candies/yellow-candy.png";




const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const Board = () => {
  const [boardColors, setBoardColors] = useState([]);

  let randomColor; 

  const randomizeColors = () => {
    let randomIndex = Math.floor(Math.random() * candyColors.length);
    randomColor = candyColors[randomIndex];
    return randomColor;
  }

  const createBoard = () => {
    const randomColors = [];
    for (let i = 0; i < width * width; i++) {
      randomizeColors(); 
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

  const moveBelow = () => {
    for (let i = 0; i < 64; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if(isFirstRow && boardColors[i] === '') {
        randomizeColors()
        boardColors[i] = randomColor;
      }
      if (boardColors[i + width] === "") {
        boardColors[i + width] = boardColors[i];
        boardColors[i] = "";
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
      moveBelow();
      setBoardColors([...boardColors]);
    }, 1000);
    return () => clearInterval(timer);
  }, [
    checkColumnOfFour,
    checkRowOfFour,
    checkColumnOfThree,
    checkRowOfThree,
    moveBelow,
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
            id={index}
            draggable={true}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
