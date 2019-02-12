import HandleEmptyCellClick from './HandleEmptyCellClick';
import CellData from '../entities/CellData';
import GenerateEmptyBoard from './GenerateEmptyBoard';
import BombCounter from './BombCounter';

describe('HandleEmptyCellClick.js', () => {
  describe('.execute', () => {
    it('Marks the target has open', () => {
      const target = new CellData({ posX: 0, posY: 0, isBomb: false });
      const board = [[target]];
      const result = HandleEmptyCellClick.execute(target, board);
      expect(result[target.posY][target.posY].open).toBe(true);
    });

    describe('Flood Filling neighbours', () => {
      it('Flood fills all touching neighbours. Starting At Center', () => {
        const boardW = 3;
        const boardH = 3;
        const target = new CellData({ posX: 1, posY: 1, isBomb: false });
        const board = GenerateEmptyBoard.execute(boardW, boardH);
        const updatedBoard = HandleEmptyCellClick.execute(target, board);

        const numberOfOpenCells = updatedBoard.reduce((total, row) => {
          const openCellsInRow = row.filter(cellData => cellData.open === true);
          const result = total + openCellsInRow.length;
          return result;
        }, 0);

        expect(numberOfOpenCells).toBe(boardW * boardH);
      });

      it('Flood fills all touching neighbours. Starting At Upper Right Corner', () => {
        const boardW = 3;
        const boardH = 3;
        const target = new CellData({ posX: 0, posY: 0, isBomb: false });
        const board = GenerateEmptyBoard.execute(boardW, boardH);
        const boardWithBombCounts = BombCounter.countBombs(
          board,
          boardW,
          boardH
        );
        const updatedBoard = HandleEmptyCellClick.execute(
          target,
          boardWithBombCounts
        );

        const numberOfOpenCells = updatedBoard.reduce((total, row) => {
          const openCellsInRow = row.filter(cellData => cellData.open === true);
          const result = total + openCellsInRow.length;
          return result;
        }, 0);

        expect(numberOfOpenCells).toBe(boardW * boardH);
      });

      it('Flood fills all touching neighbours. Starting At Upper Right Corner surrownded by bombs', () => {
        const boardW = 3;
        const boardH = 3;
        const target = new CellData({ posX: 0, posY: 0, isBomb: false });
        const board = GenerateEmptyBoard.execute(boardW, boardH);

        // add bombs
        // T _ B
        // _ _ B
        // B B B

        board[0][2].isBomb = true;
        board[1][2].isBomb = true;
        board[2][0].isBomb = true;
        board[2][1].isBomb = true;
        board[2][2].isBomb = true;

        const updatedBoard = HandleEmptyCellClick.execute(target, board);

        const numberOfOpenCells = updatedBoard.reduce((total, row) => {
          const openCellsInRow = row.filter(cellData => cellData.open === true);
          const result = total + openCellsInRow.length;
          return result;
        }, 0);

        // We expect 4 open cells, which is the target plus 3 surrounding ones
        expect(numberOfOpenCells).toBe(4);
      });

      it('Stop flooding when neighbour touches a bomb', () => {
        const boardW = 4;
        const boardH = 3;
        const target = new CellData({ posX: 0, posY: 0, isBomb: false });

        const board = GenerateEmptyBoard.execute(boardW, boardH);

        // add bombs
        // T _ 1 B
        // 1 1 1 _
        // B _ _ _

        board[0][3].isBomb = true;
        board[2][0].isBomb = true;

        const boardWithBombCounts = BombCounter.countBombs(
          board,
          boardW,
          boardH
        );
        const updatedBoard = HandleEmptyCellClick.execute(
          target,
          boardWithBombCounts
        );

        const numberOfOpenCells = updatedBoard.reduce((total, row) => {
          const openCellsInRow = row.filter(cellData => cellData.open === true);
          const result = total + openCellsInRow.length;
          return result;
        }, 0);

        // We expect 6 open cells, which is the target plus 5 surrounding ones
        // that then touch bombs and stop flodding
        expect(numberOfOpenCells).toBe(6);
      });
    });
  });
});
