import React from 'react';
import './board.css'
import { Square } from '../square/square.js'

export class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
     />);
  }

  renderRow(row) {
    return (
      <div className="board-row">
        { row }
      </div>
    );
  }

  render() {
    const gridWidth = 3;
    let squareGrid = [];

    for(let i = 0; i < gridWidth; i++){
      let row = [];
      for(let j = 0; j < gridWidth; j++){
        row.push(this.renderSquare(j + (i * gridWidth)));
      }
      squareGrid.push(this.renderRow(row));
    }

    return (
      <div>
        { squareGrid }
      </div>
    );
  }
}
