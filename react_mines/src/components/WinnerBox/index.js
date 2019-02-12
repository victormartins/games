import React from 'react';
import winnerImg from './images/winner.jpg';
import './winner_box.css';

class WinnerBox extends React.Component {
  constructor(props) {
    super(props);
    console.log('Contructing');

    this.state = { visible: true };
  }

  winnerBoxClassNames = () => {
    const classNames = [];
    const { won } = this.props;
    const { visible } = this.state;
    console.log('Won: ', won);

    if (won && visible) {
      classNames.push('winner-box-visible');
    }
    return classNames.join(' ');
  };

  handleClick = () => {
    console.log('Visible', this.state.visible);

    this.setState({ visible: false });
  };

  render() {
    console.log('Visible2: ', this.state.visible);

    return (
      <div
        onClick={this.handleClick}
        className={`winner-box ${this.winnerBoxClassNames()}`}
      >
        <img src={winnerImg} alt="Winning Illustration" />
      </div>
    );
  }
}

export default WinnerBox;
