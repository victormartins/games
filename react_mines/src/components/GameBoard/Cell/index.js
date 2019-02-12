import React from 'react';
import ClickNHold from 'react-click-n-hold';
import PropTypes from 'prop-types';

import './cell.css';

class Cell extends React.Component {
  handleClick = () => {
    const { cellData, handleBombClick, handleEmptyCellClick } = this.props;
    const { isBomb, marked } = cellData;

    if (marked) {
      console.log('Dont click a marked cell or it may explode!');
      return;
    }

    if (isBomb) {
      handleBombClick(cellData);
    } else {
      handleEmptyCellClick(cellData);
    }
  };

  // start(e) {
  //   console.log('START');
  // }

  end = (e, enough) => {
    console.log('END');
    if (enough) {
      console.log('Click released after enough time.');
    } else {
      this.handleClick();
    }
  };

  clickNHold = () => {
    this.handleClickAndHold();
  };

  handleClickAndHold = () => {
    const {
      cellData,
      handleCickWithDetectedBombs,
      handleMarkCellClick,
    } = this.props;
    const { open, detectedBombs } = cellData;
    if (open) {
      if (detectedBombs) {
        console.log('Click and detected bombs!');
        handleCickWithDetectedBombs(cellData);
      }
    } else {
      handleMarkCellClick(cellData);
    }
  };

  fetchClassNames() {
    const { cellData } = this.props;
    const { open, isBomb, detectedBombs, marked } = cellData;
    const classNames = ['cell'];
    if (open) {
      classNames.push('open');
    }

    if (isBomb) {
      classNames.push('bomb');
    }

    if (detectedBombs > 0) {
      classNames.push('danger');
    }

    if (marked) {
      classNames.push('marked');
    }
    return classNames.join(' ');
  }

  draw() {
    let result = '';
    const { cellData } = this.props;
    const { open, isBomb, detectedBombs } = cellData;

    // Don't render cell contents unless it is open
    if (!open) {
      return result;
    }

    if (isBomb) {
      result = '•';
    } else if (detectedBombs > 0) {
      result = detectedBombs;
    } else {
      result = ' ';
    }
    return result;
  }

  render() {
    return (
      <ClickNHold
        time={0.3} // Time to keep pressing. Default is 2
        onStart={this.start} // Start callback
        onClickNHold={this.clickNHold} // Timeout callback
        onEnd={this.end}
      >
        <span className={this.fetchClassNames()}>{this.draw()}</span>
      </ClickNHold>
    );
  }
}

Cell.propTypes = {
  cellData: PropTypes.object,
  handleBombClick: PropTypes.func,
  handleEmptyCellClick: PropTypes.func,
  handleCickWithDetectedBombs: PropTypes.func,
  handleMarkCellClick: PropTypes.func,
};

export default Cell;
