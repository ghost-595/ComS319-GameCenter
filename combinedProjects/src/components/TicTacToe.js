import React, { Component } from 'react'
import Board from './Board';

export default class TicTacToe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xisNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ]
        }
    }

    jumpTo(step){
            this.setState({
                stepNumber: step,
                xisNext: (step%2)===0
            })
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        const winner = calculateWinner(squares);
        if(winner || squares[i]){
            return 1;
        }

        squares[i] = this.state.xisNext ? 'X' : 'O';

        this.setState({
            history: history.concat({
                squares: squares
            }),
            xisNext: !this.state.xisNext,
            stepNumber: history.length
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        if(winner){
            status = 'Winner is ' + winner;
        } else {
            status = 'Next player is ' + (this.state.xisNext?'X':'O');
        }

        return (
            <div className="TicTacToe">
                <div className="TicTacToe-board">
                    <Board onClick={(i) => this.handleClick(i)}
                        squares={current.squares} />
                </div>
                <div className="TTT-info">
                    <div>{status}</div>
                    <button onClick={()=>{this.jumpTo(0)}}>
                            Restart game
                        </button>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i = 0; i< lines.length; i++)
    {
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            return squares[a];
        }
    }

    return null;
} 