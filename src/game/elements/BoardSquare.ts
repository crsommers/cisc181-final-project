import { Piece } from "./Piece";

export class BoardSquare {
    constructor(
        private color: string,
        private piece: Piece | null = null,
        private cracked: boolean = false
    ) {}

    /* Setters */
    setPiece(piece: Piece): void { this.piece = piece; }
    crackThisSquare(): void { this.cracked = true; }

    /* Direct Getters */
    getPiece(): Piece | null { return this.piece; }
    getSquareColor(): string { return this.color; }
    isCracked(): boolean { return this.cracked; }

    /* Short-Evaluation Getters */
    isEmpty(): boolean { return this.piece === null; }

    /* Long-Evaluation Getters */
    removePiece(): Piece | null {
        const removedPiece = this.piece;
        this.piece = null;
        return removedPiece;
    }

    /* String Representation */
    toString(): string {
        if (this.cracked) return "--XXX--";
        else if (this.piece != null) return "-" + this.piece.toString() + "-";
        else return "-------";
    }
}