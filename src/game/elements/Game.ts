import { GameBoard } from "./GameBoard";
import { Team } from "./Team";

export abstract class Game {
    constructor(
        private gameBoard: GameBoard,
        private teamA: Team,
        private teamB: Team,
        private turn: string
    ) { this.initializeGameBoard(); }

    /* Abstracts */
    abstract isGameEnded(): boolean;
    abstract getWinner(): string;
    
    /* Private methods */
    private initializeGameBoard(): void {
        for (const piece of this.teamA.getTeamPieces()) this.gameBoard.findRandomEmptySquare().setPiece(piece);
        for (const piece of this.teamB.getTeamPieces()) this.gameBoard.findRandomEmptySquare().setPiece(piece);
    }

    /* Setters */
    changeTurn(): void { this.turn = (this.turn === this.teamA.getTeamColor()) ? this.teamB.getTeamColor() : this.teamA.getTeamColor(); }

    /* Direct Getters */
    getGameBoard(): GameBoard { return this.gameBoard; }

    /* Short-Evaluation Getters */
    getCurrentTeam(): Team { return this.turn === this.teamA.getTeamColor() ? this.teamA : this.teamB; }
    getOpponentTeam(): Team { return this.turn === this.teamA.getTeamColor() ? this.teamB : this.teamA; }
    isTurn(team: Team): boolean { return team.getTeamColor() === this.turn; }

    /* String Representation */
    toString(): string {
        let retString: string = "";
        retString = retString.concat("Game Board:\n");
        retString = retString.concat("--------------");
        retString = retString.concat("\n" + this.getGameBoard().toString());
        retString = retString.concat(`\n${this.getCurrentTeam().toString()}\n`);
        retString = retString.concat(`\n${this.getOpponentTeam().toString()}\n`);
        retString = retString.concat(`\nIt is Team ${this.getCurrentTeam().getTeamColor()}'s turn\n`);
        return retString.toString();
    }
}