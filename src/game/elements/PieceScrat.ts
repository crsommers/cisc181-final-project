import { Piece } from "./Piece";

export class PieceScrat extends Piece {
    public static MAX_CRACKS: number = 2;
    private canCrack: boolean = true;
    private numAttacks: number;
    private numRecruits: number;
    private numCracks: number = 0;

    constructor(
        symbol: string = "S",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numAttacks: number = 0,
        numRecruits: number = 0,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numAttacks = numAttacks;
        this.numRecruits = numRecruits;
        this.allowableActions.push("move", "attack", "recruit"/*, "spawn"*/, "crack");
    }

    /* Direct Getters */
    getNumAttacks(): number { return this.numAttacks; }
    getNumRecruits(): number { return this.numRecruits; }
    getNumCracks(): number { return this.numCracks; }
    speak(): string { return "Aaaahhhh!"; }


    /* Setters */
    increaseNumAttacks(): void { this.numAttacks += 1; }
    increaseNumRecruits(): void { this.numRecruits += 1; }
    increaseNumCracks(): void { this.numCracks += 1; }

    updateAction(action: string): void {
        if (action === "attack") this.increaseNumAttacks();
        else if (action === "recruit") this.increaseNumRecruits();
        else if (action === "crack" && this.canCrack && this.numCracks < PieceScrat.MAX_CRACKS) this.increaseNumCracks();
    }

    /* Short-Evaluation Getters */
    canSpawn(): boolean { return this.original && this.numCracks < PieceScrat.MAX_CRACKS;}

    /* Long-Evaulation Getters */
    validMovePath(): boolean { return true; }

    spawn(): PieceScrat {
        this.numSpawns += 1;
        return new PieceScrat(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false
        );
    }
}