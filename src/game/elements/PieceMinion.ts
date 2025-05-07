import { Piece } from "./Piece";
import { Location } from "./Location";

export class PieceMinion extends Piece {
    private numRecruits: number;

    public static readonly MAX_NUM_SPAWNED: number = 3;

    constructor(
        symbol: string = "M",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numRecruits: number = 0,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numRecruits = numRecruits;
        this.allowableActions.push("move", "recruit", "spawn");
    }

    /* Setters */
    increaseNumRecruits(): void { this.numRecruits += 1; }
    updateAction(action: string): void { if (action === "recruit") this.increaseNumRecruits(); }
    
    /* Direct getters */
    getNumRecruits(): number { return this.numRecruits; }
    speak(): string { return "Bello!"; }

    /* Short-Evaulation getters */
    canSpawn(): boolean { return this.original && this.numSpawns <= PieceMinion.MAX_NUM_SPAWNED; }

    /* Long-Evaluation getters */
    validMovePath(start: Location, end: Location): boolean {
        return Math.sqrt(Math.pow(end.getRow() - start.getRow(), 2) + Math.pow(end.getCol() - start.getCol(), 2)) <= 3;
    }

    spawn(): PieceMinion {
        this.numSpawns += 1;
        return new PieceMinion(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false
        );
    }
}
