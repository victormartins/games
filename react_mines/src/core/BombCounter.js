class BombCounter {
  static countBombs(gameBoard, boardW, boardH) {
    gameBoard.forEach(row => {
      row.forEach(cell => {
        if (cell.isBomb) {
          cell.detectedBombs = undefined;
        } else {
          cell.detectedBombs = this.countBombsAroundCell(
            cell,
            gameBoard,
            boardW,
            boardH
          );
        }
      });
    });

    this.countBombsAroundCell(gameBoard[0][0], gameBoard, boardW, boardH);
    return gameBoard;
  }

  static countBombsAroundCell(cell, gameBoard, boardW, boardH) {
    const { posX, posY } = cell;
    let totalBombs = 0;

    for (let yOffSet = -1; yOffSet <= 1; yOffSet += 1) {
      for (let xOffSet = -1; xOffSet <= 1; xOffSet += 1) {
        const row = posY + yOffSet;
        const col = posX + xOffSet;

        if (row >= 0 && row < boardH && col >= 0 && col < boardW) {
          // console.log('row, col', row, col);
          // ignore if coordinates are the same as target cell
          if (!(row === posY && col === posX)) {
            if (gameBoard[row][col].isBomb) {
              totalBombs += 1;
            }
          }
        }
      }
    }
    return totalBombs;
  }
}

export default BombCounter;
