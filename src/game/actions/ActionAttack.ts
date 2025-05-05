import { GameS25 } from "../elements/GameS25";
import { BoardSquare } from "../elements/BoardSquare";
import { Location } from "../elements/Location";
import { Piece } from "../elements/Piece";
import { Action } from "./Action";

export class ActionAttack extends Action {
    constructor(
        game: GameS25,
        startLocation: Location,
        endLocation: Location,
    ) { super(game, startLocation, endLocation); }

    /* Direct Getters */
    validAction(): boolean { return this.game.getRules().checkValidAttack(this.startLocation, this.endLocation); }

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
            }
            endSquare.setPiece(piece); // this removes the piece being attacked as well
            startSquare.removePiece();
            this.game.changeTurn();
        }
    }
}