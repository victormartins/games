import NewBoardGenerator from './NewBoardGenerator';

describe('NewBoardGenerator', () => {
  describe('#generate', () => {
    it('returns an array with the right dimensions', () => {
      const nbg = new NewBoardGenerator({ boardW: 8, boardH: 5, maxBombs: 0 });
      const result = nbg.generate();

      expect(result.length).toBe(5); // rows
      expect(result[0].length).toBe(8); // columns
    });

    describe('Number of Bombs', () => {
      it('With maxBombs: 0 returns zero bombs', () => {
        const nbg = new NewBoardGenerator({
          boardW: 8,
          boardH: 5,
        });
        const result = nbg.generate(0);

        const bombs = result
          .map(row => row.filter(cell => cell.isBomb === true))
          .reduce((rowOfBombs, combined) => rowOfBombs.concat(combined), []);

        expect(bombs.length).toBe(0);
      });

      it('With maxBombs: 10 returns 10 bombs', () => {
        const nbg = new NewBoardGenerator({
          boardW: 8,
          boardH: 5,
        });
        const result = nbg.generate(10);

        const bombs = result
          .map(row => row.filter(cell => cell.isBomb === true))
          .reduce((rowOfBombs, combined) => rowOfBombs.concat(combined), []);

        expect(bombs.length).toBe(10);
      });
    });
  });
});
