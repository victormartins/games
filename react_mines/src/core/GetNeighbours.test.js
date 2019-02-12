import GenerateEmptyBoard from './GenerateEmptyBoard';
import GetNeighbours from './GetNeighbours';
import CellData from '../entities/CellData';

describe('GetNeighbours', () => {
  it('starting from center', () => {
    const boardW = 3;
    const boardH = 3;
    const board = GenerateEmptyBoard.execute(boardW, boardH);
    const target = new CellData({ posX: 1, posY: 1 });
    const result = GetNeighbours.execute(target, board);

    expect(result.length).toBe(8);
  });

  it('starting from upper left corner', () => {
    const boardW = 3;
    const boardH = 5;
    const board = GenerateEmptyBoard.execute(boardW, boardH);
    const target = new CellData({ posX: 0, posY: 0 });
    const result = GetNeighbours.execute(target, board);

    expect(result.length).toBe(3);
  });

  it('starting from bottom right corner', () => {
    const boardW = 3;
    const boardH = 5;
    const board = GenerateEmptyBoard.execute(boardW, boardH);
    const target = new CellData({ posX: 2, posY: 4 });
    const result = GetNeighbours.execute(target, board);

    expect(result.length).toBe(3);
  });
});
