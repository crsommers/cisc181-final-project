import { GameS25 } from "../elements/GameS25";
import { BoardSquare } from "../elements/BoardSquare";
import { Location } from "../elements/Location";
import { Piece } from "../elements/Piece";
import { Action } from "./Action";

export class ActionRecruit extends Action {
    constructor(
        game: GameS25,
        startLocation: Location,
        endLocation: Location,
    ) { super(game, startLocation, endLocation); }

    /* Direct Getters */
    validAction(): boolean { return this.game.getRules().checkValidRecruit(this.startLocation, this.endLocation); }

    /* Miscellaneous Methods */
    performAction(): void {
        const startSquare: BoardSquare = this.game.getGameBoard().getAllSquares()[this.startLocation.getRow()][this.startLocation.getCol()];
        const endSquare: BoardSquare = this.game.getGameBoard().getAllSquares()[this.endLocation.getRow()][this.endLocation.getCol()];
        const recruitedPiece: Piece | null = endSquare.getPiece();
        if (recruitedPiece) {
            recruitedPiece.speak();
            this.game.getOpponentTeam().removePieceFromTeam(recruitedPiece);
            this.game.getCurrentTeam().addPieceToTeam(recruitedPiece);
            this.game.changeTurn();
        }
    }
}