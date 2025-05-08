import { GameS25 } from "./game/elements/GameS25";
import { Location } from "./game/elements/Location";
import { PieceBlueHen } from "./game/elements/PieceBlueHen";
import { PieceMinion } from "./game/elements/PieceMinion";
import { PieceScrat } from "./game/elements/PieceScrat";
import { Action } from "./game/actions/Action";
import { ActionMove } from "./game/actions/ActionMove";
import { ActionRecruit } from "./game/actions/ActionRecruit";
import { ActionSpawn } from "./game/actions/ActionSpawn";
import { ActionCrack } from "./game/actions/ActionCrack";
import { ActionAttack } from "./game/actions/ActionAttack";
import { ActionRangedAttack } from "./game/actions/ActionRangedAttack";
import { Team } from "./game/elements/Team";
import { GameBoard } from "./game/elements/GameBoard";
import { PieceChemist } from "./game/elements/PieceChemist";

export class Controller {
    private game: GameS25;

    constructor(rows: number, cols: number) {
        this.game = this.createGame(rows, cols);
    }

    /* Private Methods */
    private createGame(rows: number, cols: number): GameS25 {
        const gameBoard = new GameBoard(rows, cols);
        const teamA = new Team("Red", [
            new PieceBlueHen("Red"),
            new PieceMinion("Red"),
            new PieceScrat("Red"),
            new PieceChemist("Red")
        ]);
        const teamB = new Team("Blue", [
            new PieceBlueHen("Blue"),
            new PieceMinion("Blue"),
            new PieceScrat("Blue"),
            new PieceChemist("Blue")
        ]);
        return new GameS25(gameBoard, teamA, teamB, "Red");
    }

    /* Direct Getters */
    getGame(): GameS25 { return this.game; }
    getTurn(): string { return this.game.getCurrentTeam().getTeamColor(); }
    getStatus(): string { return this.game.getRules().getMessage(); }

    /* Miscellaneous Methods */
    carryOutAction(startLocation: Location, endLocation: Location, actionType: string): boolean {
        let action: Action | null = null;

        if (actionType === "move") action = new ActionMove(this.game, startLocation, endLocation);
        else if (actionType === "attack") action = new ActionAttack(this.game, startLocation, endLocation);
        else if (actionType === "rangedattack") action = new ActionRangedAttack(this.game, startLocation, endLocation);
        else if (actionType === "recruit") action = new ActionRecruit(this.game, startLocation, endLocation);
        else if (actionType === "spawn") action = new ActionSpawn(this.game, startLocation, endLocation);
        else if (actionType === "crack") action = new ActionCrack(this.game, startLocation, endLocation);

        if (action && action.validAction()) {
            action.performAction();
            return true;
        }
        return false;
    }
}