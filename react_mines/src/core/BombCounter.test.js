import BombCounter from './BombCounter';
import NewBoardGenerator from './NewBoardGenerator';

describe('BombCounter', () => {
  it('counts bombs', () => {
    const boardW = 4;
    const boardH = 5;
    const gameBoard = new NewBoardGenerator({
      boardW,
      boardH,
      maxBombs: 0,
    }).generate();

    // add bombs
    // _ _ _ _
    // _ X X _
    // _ X X _
    // _ X _ _
    // _ _ _ _

    gameBoard[1][1].isBomb = true;
    gameBoard[1][2].isBomb = true;
    gameBoard[2][1].isBomb = true;
    gameBoard[2][2].isBomb = true;
    gameBoard[3][1].isBomb = true;

    // expected bomb count
    // 1 2 2 1
    // 2 X X 2
    // 3 X X 2
    // 2 X 3 1
    // 1 1 1 0

    const result = BombCounter.countBombs(gameBoard, boardW, boardH);
    expect(result[0][0].detectedBombs).toBe(1);
    expect(result[0][1].detectedBombs).toBe(2);
    expect(result[0][2].detectedBombs).toBe(2);
    expect(result[0][3].detectedBombs).toBe(1);

    expect(result[1][0].detectedBombs).toBe(2);
    expect(result[1][1].detectedBombs).toBe(undefined);
    expect(result[1][2].detectedBombs).toBe(undefined);
    expect(result[1][3].detectedBombs).toBe(2);

    expect(result[2][0].detectedBombs).toBe(3);
    expect(result[2][1].detectedBombs).toBe(undefined);
    expect(result[2][2].detectedBombs).toBe(undefined);
    expect(result[2][3].detectedBombs).toBe(2);

    expect(result[3][0].detectedBombs).toBe(2);
    expect(result[3][1].detectedBombs).toBe(undefined);
    expect(result[3][2].detectedBombs).toBe(3);
    expect(result[3][3].detectedBombs).toBe(1);

    expect(result[4][0].detectedBombs).toBe(1);
    expect(result[4][1].detectedBombs).toBe(1);
    expect(result[4][2].detectedBombs).toBe(1);
    expect(result[4][3].detectedBombs).toBe(0);
  });
});
