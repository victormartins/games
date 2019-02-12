import React from 'react';
import NewBoardGenerator from '../../core/NewBoardGenerator';
import HandleEmptyCellClick from '../../core/HandleEmptyCellClick';
import Cell from './Cell';
import './game_board.css';
import GetNeighbours from '../../core/GetNeighbours';
import FloodFill from '../../core/FloodFill';
import WinnerBox from '../WinnerBox';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      boardW: 35,
      boardH: 35,
      percentageOfBombs: 0.2, // 20%;
      gameover: false,
      win: false,
    };

    const { boardW, boardH } = this.state;
    this.newBoardGenerator = new NewBoardGenerator({
      boardW,
      boardH,
    });
  }

  componentWillMount() {
    this.initBoard();
  }

  handleEmptyCellClick = cellData => {
    const { board } = this.state;
    const updatedBoard = HandleEmptyCellClick.execute(cellData, board);

    const win = updatedBoard.every(row =>
      row.every(cell => {
        if (cell.isBomb) {
          return true;
        }

        if (cell.open) {
          return true;
        }

        return true;
      })
    );

    this.setState({
      board: updatedBoard,
      win,
    });
  };

  openAllCells = () => {
    const { board } = this.state;
    board.forEach(row => {
      row.forEach(cell => {
        cell.open = true;
      });
    });

    this.setState({ board });
  };

  handleBombClick = cellData => {
    this.setState({
      gameover: true,
    });
    this.openAllCells();
  };

  handleMarkCellClick = cellData => {
    const { board } = this.state;
    board[cellData.posY][cellData.posX].marked = !cellData.marked;
    this.setState({ board });
  };

  handleCickWithDetectedBombs = cellData => {
    const { board } = this.state;
    const neighbours = GetNeighbours.execute(cellData, board);
    const markedNeighbours = neighbours.filter(cell => cell.marked);
    const floadFiller = new FloodFill(board);
    let gameover = false;

    if (markedNeighbours.length >= cellData.detectedBombs) {
      // expand neighbours
      neighbours.forEach(cell => {
        if (!cell.open && !cell.marked) {
          console.log(`${cell.posX},${cell.posY}`);
          floadFiller.flood(cell);

          if (cell.isBomb) {
            gameover = true;
            this.openAllCells();
          }
        }
      });
      // debugger;
      this.setState({ board, gameover });
    }
  };

  initBoard = () => {
    console.log('Init Board...');
    const { boardW, boardH, percentageOfBombs } = this.state;
    const maxBombs = Math.round(boardW * boardH * percentageOfBombs);
    const newBoard = this.newBoardGenerator.generate(maxBombs);
    this.setState({
      board: newBoard,
      gameover: false,
      win: false,
    });
  };

  render() {
    const { board, win } = this.state;
    const drawGameCells = () => {
      const cellsForRow = row =>
        row.map(cellData => {
          const { posX, posY } = cellData;
          return (
            <Cell
              key={`${posX}_${posY}`}
              cellData={cellData}
              handleBombClick={this.handleBombClick}
              handleEmptyCellClick={this.handleEmptyCellClick}
              handleMarkCellClick={this.handleMarkCellClick}
              handleCickWithDetectedBombs={this.handleCickWithDetectedBombs}
            />
          );
        });

      const rows = board.map((row, index) => (
        <div key={index} className="game-board__cells__row">
          {cellsForRow(row)}
        </div>
      ));
      return rows;
    };

    return (
      <div className="game-board">
        <div className="game-board__container">
          <div className="game-board__cells">{drawGameCells()}</div>
          <div className="game-board__options">
            <button onClick={this.initBoard}>Restart</button>
            {/* <div>
              Width:
              <input value={this.state.boardW} />x
            </div>
            <div>
              Height:
              <input value={this.state.boardH} />
            </div>
            <select>
              <option value={0.1}>Easy</option>
              <option value={0.2}>Normal</option>
              <option value={0.4}>Hard</option>
              <option value={0.6}>Very Hard</option>
            </select> */}
          </div>
          <br />
          <br />
        </div>
        <WinnerBox won={win} />
      </div>
    );
  }
}

export default GameBoard;
