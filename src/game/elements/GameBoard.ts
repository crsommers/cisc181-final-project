import { BoardSquare } from "./BoardSquare";
import { Location } from "./Location";

export class GameBoard {
    private allSquares: BoardSquare[][];

    constructor(
        private numRows: number,
        private numCols: number
    ) {
        this.allSquares = [];
        for (let y = 0; y < numRows; y++) {
            this.allSquares.push([]);
            for (let x = 0; x < numCols; x++) this.allSquares[y].push(new BoardSquare((x+y)%2===0?"black":"white", null, false));
        }
        this.setUpEmptyBoard();
    }

    /* Private methods */
    private setUpEmptyBoard(): void {
        for (let row = 0; row < this.numRows; row++) for (let col = 0; col < this.numCols; col++)
            this.allSquares[row][col] = new BoardSquare((row+col)%2===0?"black":"white", null, false);
    }

    /* Direct Getters */
    getNumRows(): number { return this.numRows; }
    getNumColumns(): number { return this.numCols; }
    getAllSquares(): BoardSquare[][] { return this.allSquares; }
    getSquare(location: Location): BoardSquare { return this.allSquares[location.getRow()][location.getCol()]; }

    /* Short-Evaluation Getters */
    inBounds(row: number, col: number): boolean { return 0 <= row && row < this.numRows && 0 <= col && col < this.numCols; }

    isBoardFull(): boolean {
        for (const row of this.allSquares) for (const square of row) if (square.isEmpty()) return false;
        return true;
    }
    
    findRandomEmptySquare(): BoardSquare { // No case for when there are no empty squares as there never will be 0 empties
        let emptySquares: BoardSquare[] = [];
        for (const row of this.allSquares) for (const square of row) if (square.isEmpty()) emptySquares.push(square);
        return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }

    /* String Representation */
    toString(): string {
        let boardString = "";
        for (const row of this.allSquares) {
            for (const square of row) boardString += square.toString() + " ";
            boardString += "\n";
        }
        return boardString;
    }
}


/* Functions */
export function squareColors(board: GameBoard): string {
    let boardString: string = "";
    boardString = boardString.concat("Col :   ");

    for (let col = 0; col < board.getNumColumns(); col++) {
        boardString = boardString.concat(col + "   ");
    }
    boardString = boardString.concat("\n");
    for (let row = 0; row < board.getNumRows(); row++) {
        boardString = boardString.concat("Row : " + row + "   ");
        for (let col = 0; col < board.getNumColumns(); col++) {
            boardString = boardString.concat(
                board.getAllSquares()[row][col].getSquareColor() + "  ",
            );
        }
        boardString = boardString.concat("\n");
    }
    return boardString;
}