
const getPieceAbove = (boardSize, index) => {
  const aboveIndex = index - boardSize.columns
  if (aboveIndex < 0) return null
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
  if (next && board[next] === player)
    return isSequenceOfFourWithMovement(movement, board, player, next, boardSize, currentCount + 1)
  else 
    return false
}

export const checkWinnerFrom = (boardToCheck, boardSize) => {

  const occupiedIndexesByPlayer = boardToCheck.reduce((acc, i, index) => {
    if (i === null) return acc;
    acc[i] = [...(acc[i] ?? []), index]
    return acc
  }, {});

  for (const player of Object.keys(occupiedIndexesByPlayer)) {
    for (const piece of occupiedIndexesByPlayer[player].sort().reverse()) {
      const possibleMovements = [
        () => isSequenceOfFourWithMovement((a, b) => getPieceAbove(a, b), boardToCheck, player, piece, boardSize, 0),
        () => isSequenceOfFourWithMovement((a, b) => getPieceAbove(a, getPieceRight(a, b)), boardToCheck, player, piece, boardSize, 0),
        () => isSequenceOfFourWithMovement((a, b) => getPieceAbove(a, getPieceLeft(a, b)), boardToCheck, player, piece, boardSize, 0),
        () => isSequenceOfFourWithMovement((a, b) => getPieceLeft(a, b), boardToCheck, player, piece, boardSize, 0)
      ]
      if (possibleMovements.find(mov => mov())) return player
    }
  }
  return null;
};

export const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((square) => square != null);
};
