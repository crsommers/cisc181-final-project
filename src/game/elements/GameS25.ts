import { Game } from "./Game";
import { GameBoard } from "./GameBoard";
import { Team } from "./Team";
import { Rules } from "./Rules";

export class GameS25 extends Game {
    private rules: Rules;

    constructor(
        gameBoard: GameBoard,
        teamA: Team,
        teamB: Team,
        turn: string
    ) {
        super(gameBoard, teamA, teamB, turn);
        this.rules = new Rules(this);
    }

    /* Direct Getters */
    getRules(): Rules { return this.rules; }

    /* Short-Evaluation Getters */
    isGameEnded(): boolean { return this.getCurrentTeam().getTeamPieces().length === 0 || this.getOpponentTeam().getTeamPieces().length === 0; }

    /* Long-Evaluation Getters */
    getWinner(): string {
        if (this.getCurrentTeam().getTeamPieces().length > 0) return this.getCurrentTeam().getTeamColor();
        return (this.getOpponentTeam().getTeamPieces().length > 0) ? this.getOpponentTeam().getTeamColor() : "Tie";
    }
}