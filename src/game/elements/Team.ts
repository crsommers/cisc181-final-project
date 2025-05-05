import { Piece } from "./Piece";

export class Team {
    constructor(private teamColor: string,
                private teamPieces: Piece[] = []
    ) {}

    /* Direct Getters */
    getTeamColor(): string { return this.teamColor; }
    getTeamPieces(): Piece[] { return this.teamPieces; }

    /* Setters */
    removePieceFromTeam(piece: Piece): void {
        const index = this.teamPieces.indexOf(piece);
        if (index !== -1) this.teamPieces.splice(index, 1);
    }

    addPieceToTeam(piece: Piece): void {
        piece.setTeamColor(this.teamColor);
        this.teamPieces.push(piece);
    }

    /* String Representation */
    toString(): string { return `Team ${this.teamColor} Pieces:\n` + this.teamPieces.map(piece => piece.toString()).join(" "); }
}