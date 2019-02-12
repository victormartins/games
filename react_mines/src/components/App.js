import React from 'react';
import './app.css';
import GameBoard from './GameBoard';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <h1 className="app-tittle">React Mines</h1>
        <GameBoard />
      </div>
    );
  }
}

export default App;
