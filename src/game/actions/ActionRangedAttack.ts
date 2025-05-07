import { GameS25 } from "../elements/GameS25";
import { BoardSquare } from "../elements/BoardSquare";
import { Location } from "../elements/Location";
import { Piece } from "../elements/Piece";
import { Action } from "./Action";

export class ActionRangedAttack extends Action {
    constructor(
        game: GameS25,
        startLocation: Location,
        endLocation: Location,
    ) { super(game, startLocation, endLocation); }

    /* Direct Getters */
    validAction(): boolean {
        return this.game.getRules().checkValidAttack(this.startLocation, this.endLocation) &&
               Math.sqrt(Math.pow(this.endLocation.getRow() - this.startLocation.getRow(), 2) + 
                         Math.pow(this.endLocation.getCol() - this.startLocation.getCol(), 2)) <= 4;
    }

    /* Miscellaneous Methods */
    performAction(): void {
        const startSquare: BoardSquare = this.game.getGameBoard().getAllSquares()[this.startLocation.getRow()][this.startLocation.getCol()];
        const endSquare: BoardSquare = this.game.getGameBoard().getAllSquares()[this.endLocation.getRow()][this.endLocation.getCol()];
        const piece: Piece | null = startSquare.getPiece();
        if (piece) {
            const attackedPiece: Piece | null = endSquare.getPiece();
            if (attackedPiece) {
                attackedPiece.speak();
                this.game.getCurrentTeam().removePieceFromTeam(attackedPiece);
                endSquare.removePiece();
            }
            endSquare.setPiece(piece); // this removes the piece being attacked as well
            this.game.changeTurn();
        }
    }
}