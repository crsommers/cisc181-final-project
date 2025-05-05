export abstract class Piece {
    protected numSpawns: number = 0;
    protected allowableActions: string[] = [];

    constructor(
        protected symbol: string,
        protected teamColor: string,
        protected hidden: boolean,
        protected original: boolean,
    ) {}

    /* Abstracts */
    abstract speak(): string;
    abstract validMovePath(): boolean;
    abstract spawn(): Piece;
    abstract canSpawn(): boolean;
    abstract updateAction(action: string): void;

    /* Direct Getters */
    getSymbol(): string { return this.symbol; }
    getTeamColor(): string { return this.teamColor; }
    isHidden(): boolean { return this.hidden; }
    isOriginal(): boolean { return this.original; }
    getNumSpawns() { return this.numSpawns; }
    setSymbol(symbol: string): void { this.symbol = symbol; }
    setTeamColor(teamColor: string): void { this.teamColor = teamColor; }
    setHidden(hidden: boolean): void { this.hidden = hidden; }
    setOriginal(original: boolean): void { this.original = original; }

    /* Short-Evaluation Getters */
    allowableAction(action: string): boolean { return this.allowableActions.includes(action) || (action === "spawn" && this.canSpawn()); }

    /* String Representation */
    toString(): string { return this.teamColor.slice(0, 3) + " " + this.symbol; }
}
