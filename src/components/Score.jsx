import "../index.css";

const Score = ({ score }) => {
  return (
    <div className="score">
      <h1>{score}</h1>
    </div>
  );
};

export default Score;
