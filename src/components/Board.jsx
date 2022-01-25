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
const candyColors = [
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy,
];

const Board = () => {
  const [boardColors, setBoardColors] = useState([]);
  const [squareToDrag, setSquareToDrag] = useState(null);
  const [squareToReplace, setSquareToReplace] = useState(null);

  let randomColor;

  const randomizeColors = () => {
    let randomIndex = Math.floor(Math.random() * candyColors.length);
    randomColor = candyColors[randomIndex];
    return randomColor;
  };

  const createBoard = () => {
    const randomColors = [];
    for (let i = 0; i < width * width; i++) {
      randomizeColors();
      randomColors.push(randomColor);
    }
    setBoardColors(randomColors);
  };

  const checkColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let colorToCheck = boardColors[i];
      if (
        columnOfFour.every((square) => boardColors[square] === colorToCheck)
      ) {
        columnOfFour.forEach((square) => (boardColors[square] = Blank));
        return true;
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
        rowOfFour.forEach((square) => (boardColors[square] = Blank));
        return true;
      }
    }
  };

  const checkColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let colorToCheck = boardColors[i];
      if (
        columnOfThree.every((square) => boardColors[square] === colorToCheck)
      ) {
        columnOfThree.forEach((square) => (boardColors[square] = Blank));
        return true;
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
        rowOfThree.forEach((square) => (boardColors[square] = Blank));
        return true;
      }
    }
  };

  const moveBelow = () => {
    // for (let i = 0; i < 64; i++) {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && boardColors[i] === Blank) {
        randomizeColors();
        boardColors[i] = randomColor;
      }
      if (boardColors[i + width] === Blank) {
        boardColors[i + width] = boardColors[i];
        boardColors[i] = Blank;
      }
    }
  };

  const dragStart = (e) => {
    // console.log(e.target);
    console.log("dragStart");
    setSquareToDrag(e.target);
  };

  const drop = (e) => {
    //console.log(e.target);
    console.log("drop");
    setSquareToReplace(e.target);
  };

  const dragEnd = (e) => {
    //console.log(e.target);
    console.log("dragEnd");
    const idDraggedSquare = parseInt(squareToDrag.getAttribute("id"));
    const idSquareToReplace = parseInt(squareToReplace.getAttribute("id"));

    boardColors[idDraggedSquare] = squareToReplace.getAttribute('src');
    boardColors[idSquareToReplace] = squareToDrag.getAttribute('src');

    //a bunch of numbers of valid indexes / places
    const validMoves = [
      idDraggedSquare - 1,
      idDraggedSquare - width,
      idDraggedSquare + 1,
      idDraggedSquare + width,
    ];
    // if the number is included in the array above -> then is a valid move and we can execute it on dragEnd (after drop)
    const validMove = validMoves.includes(idSquareToReplace);
    const isColOfFour = checkColumnOfFour();
    const isRowOfFour = checkRowOfFour();
    const isColOfThree = checkColumnOfThree();
    const isRowOfThree = checkRowOfThree();

    if (
      squareToReplace &&
      validMove &&
      (isColOfFour || isRowOfFour || isColOfThree || isRowOfThree)
    ) {
      setSquareToDrag(null); //we start again
      setSquareToReplace(null);
    } else {
      boardColors[idSquareToReplace] = squareToReplace.getAttribute('src');
      boardColors[idDraggedSquare] = squareToDrag.getAttribute('src');
      setBoardColors([...boardColors]);
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
    }, 50);
    return () => clearInterval(timer);
  }, [
    checkColumnOfFour,
    checkRowOfFour,
    checkColumnOfThree,
    checkRowOfThree,
    moveBelow,
    boardColors,
  ]);

  //console.log(boardColors);

  return (
    <div className="app">
      <div className="game">
        {boardColors.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            // style={{ backgroundColor: candyColor }}
            // alt={candyColor}
            id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={drop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
