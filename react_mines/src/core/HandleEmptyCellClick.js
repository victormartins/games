import FloodFill from './FloodFill';

class HandleEmptyCellClick {
  static execute(target, board) {
    console.log('click on target', target);
    const { open } = target;
    let updatedBoard;

    if (open) {
      updatedBoard = board;
    } else {
      updatedBoard = new FloodFill(board).flood(target);
    }
    return updatedBoard;
  }
}

export default HandleEmptyCellClick;
