import { Piece } from "./Piece";
import { Location } from "./Location";

export class PieceChemist extends Piece {

    constructor(
        symbol: string = "H",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
    ) {
        super(symbol, teamColor, hidden, original);
        this.allowableActions.push("move", "rangedattack");
    }

    /* Setters */
    updateAction(action: string): void {}

    /* Direct getters */
    canSpawn(): boolean { return true; }
    speak(): string { return "I throw-a the flasks!"; }

    /* Long-Evaluation getters */
    validMovePath(start: Location, end: Location): boolean {
        return (end.getRow() - start.getRow()) + (end.getCol() - start.getCol()) < 4;
    }

    spawn(): PieceChemist {
        return new PieceChemist(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false
        );
    }
}