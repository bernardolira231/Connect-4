export const saveGameStorage = ({ board, turn }) => {
  console.log("board:", board);
  console.log("turn:", turn);
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

export const resetGameStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
