import React, { Component } from 'react'
import Cell from './Cell'
import './Board.css'

export default class Board extends Component {

    static defaultProps = {
        nRows: 6,
        nCols: 6,
        chanceLightsOn: 0.25 
    }

    constructor(props){
        super(props)
        this.state = {
            hasWon: false,
            board: this.createBoard()
        }
    }

    createBoard(){
        let board = []
        for(let y=0; y<this.props.nRows ; y++){
            let rows = []
            for(let x=0; x<this.props.nCols; x++){
                rows.push(Math.random() < this.props.chanceLightsOn)
            }
            board.push(rows)
        }
        return board;
    }

    flipCellsAround(coord){
        let {nCols, nRows} = this.props
        let [y,x] = coord.split("-").map(Number)
        let board = this.state.board

        function flipCell(y,x){
            if(y >= 0 && y < nRows && x >= 0 && x < nCols){
                board[y][x] = !board[y][x]
            }
        }

        flipCell(y, x)
        flipCell(y - 1, x)
        flipCell(y + 1, x)
        flipCell(y, x - 1)
        flipCell(y, x + 1)

        let hasWon = board.every(row => row.every(cell => !cell))

        this.setState({ board: board, hasWon: hasWon})
    }

    render() {

        if(this.state.hasWon){
            return (
                <div className="Board-title">
                    <div className="neon-orange">You</div>
                    <div className="neon-blue">Won</div>
                </div>
            )
        }

        let tBoard = []

        for(let y=0; y<this.props.nRows ; y++){
            let rows = []
            for(let x=0; x<this.props.nCols; x++){
                let coord = `${y}-${x}`
                rows.push(<Cell
                    key={coord} 
                    isLit={this.state.board[y][x]} 
                    flipCellsAroundMe={() => this.flipCellsAround(coord)}/>)
            }
            tBoard.push(<tr key={y}>{rows}</tr>)
        }

        return (
            <div>
                <div className="Board-title">
                    <div className="neon-orange">Lights</div>
                    <div className="neon-blue">Out</div>
                </div>
                <table className="Board">
                    <tbody>
                        {tBoard}
                    </tbody>
                </table>
            </div>
        )
    }
}
