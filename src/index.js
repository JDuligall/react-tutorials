import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { calculateWinner } from './utils.js';
import { Board } from './components/board/board.js'

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        location: null,
      }],
      stepNumber: 0,
      boldSelected: false,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(current.squares) || current.squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        location: i,
      }]),
      stepNumber: history.length,
      boldSelected: false,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      boldSelected: true,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move, history) => {

      let printableLocation;
      if (step.location !== null) {
        const colOffset = 1;
        const gridWidth = 3;
        const row = gridWidth - Math.floor(step.location / gridWidth);
        const col = colOffset + step.location % gridWidth;
        printableLocation = '(' + col + ',' + row + ')';
      }

      const desc = move ?
        'Go to move #' + move + ' ' + printableLocation :
        'Go to game start';
      return (
        <li key={move}>
          <button
            className={ this.state.boldSelected
              && this.state.stepNumber === move ? 'bold-font' : ''}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);