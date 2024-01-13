import { WINNER_COMBOS } from "../constants";

const getPieceAbove = (boardSize, index) => {
  const aboveIndex = index - boardSize.columns
  return aboveIndex
}

const getPieceRight = (boardSize, index) => {
  if (index + 1 % boardSize.columns == 0) return null
  return index + 1
}

const getPieceLeft = (boardSize, index) => {
  if (index % boardSize.columns == 0) return null
  return index - 1
}

const isSequenceOfFourWithMovement = (movement, board, player, index, boardSize, currentCount) => {
  if (currentCount + 1 === 4) return true
  const next = movement(boardSize, index)
  if (next && board[next] === player) {
    return isSequenceOfFourWithMovement(movement, board, player, next, boardSize, currentCount + 1)
  } else {
    return false
  }
}

export const checkWinnerFrom = (boardToCheck, boardSize) => {

  const occupiedIndexesByPlayer = boardToCheck.reduce((acc, i, index) => {
    if (i === null) return acc;
    acc[i] = [...(acc[i] ?? []), index]
    return acc
  }, {});

  const players = Object.keys(occupiedIndexesByPlayer);
  for (const player of players) {
    const pieces = occupiedIndexesByPlayer[player].sort().reverse()

    for (const piece of pieces) {
      const isColumn = isSequenceOfFourWithMovement((a, b) => getPieceAbove(a, b), boardToCheck, player, piece, boardSize, 0)
      if (isColumn) {
        return player;
      }

      const isDiagRight = isSequenceOfFourWithMovement((a, b) => getPieceAbove(a, getPieceRight(a, b)), boardToCheck, player, piece, boardSize, 0)
      if (isDiagRight) {
        return player;
      }


      const isDiagLeft = isSequenceOfFourWithMovement((a, b) => getPieceAbove(a, getPieceLeft(a, b)), boardToCheck, player, piece, boardSize, 0)
      if (isDiagLeft) {
        return player;
      }

      const isLineLeft = isSequenceOfFourWithMovement((a, b) => getPieceLeft(a, b), boardToCheck, player, piece, boardSize, 0)
      if (isLineLeft) {
        return player;
      }
    }
  }

  console.log("occupied indexes", Object.entries(occupiedIndexesByPlayer))


  return null;
};

export const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((square) => square != null);
};
