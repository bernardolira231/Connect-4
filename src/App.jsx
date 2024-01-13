import { useState } from "react";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGameStorage, resetGameStorage } from "./logic/storage/index.js";

const boardSize = {
  columns: 8,
  rows: 7
}

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(boardSize.columns*boardSize.rows).fill(null);
  });


  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(boardSize.columns*boardSize.rows).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    while (newBoard[index + 8] === null) {
      index += 8;
    }
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    console.log("newBoard:", newBoard);
    console.log("newTurn:", newTurn);
    saveGameStorage({
      board: newBoard,
      turn: newTurn,
    });
    const newWinner = checkWinnerFrom(newBoard, boardSize);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <button onClick={resetGame}>Reset del juego</button>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
