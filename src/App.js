import { useEffect, useState } from "react";
import "./index.css";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
  const [board, setBoard] = useState([]);

  const createBoard = () => {
    const randomCandies = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomCandies.push(randomColor);
    }
    setBoard(randomCandies);
  };

  useEffect(() => {
    createBoard();
  }, []);

  return (
    <div className="app">
      <div className="game">
        {board.map((candyColor, index) => (
          <img key={index} style={{ backgroundColor: candyColor }} alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
