import { Piece } from "./Piece";

export class PieceBlueHen extends Piece {
    public static readonly MAX_NUM_ATTACKS: number = 3;
    private flies: boolean = true;
    private numAttacks: number;

    constructor(
        symbol: string = "H",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numAttacks: number = 0,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numAttacks = numAttacks;
        this.allowableActions.push("move", "attack", "spawn");
        this.updateFly();
    }

    /* Private Methods */
    private updateFly(): void { this.flies = this.numAttacks <= PieceBlueHen.MAX_NUM_ATTACKS; }

    /* Setters */
    updateAction(action: string): void { if (action === "attack") this.increaseNumAttacks(); }

    /* Direct getters */
    getNumAttacks(): number { return this.numAttacks; }
    speak(): string { return "Go UD!"; }

    /* Short-Evaulation getters */
    canSpawn(): boolean { return this.original && this.numSpawns === 0; }

    /* Long-Evaluation getters */
    validMovePath(): boolean { return true; }

    increaseNumAttacks(): void {
        this.numAttacks += 1;
        this.updateFly();
    }

    spawn(): PieceBlueHen {
        this.numSpawns += 1;
        return new PieceBlueHen(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false
        );
    }
}