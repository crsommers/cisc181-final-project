import { GameS25 } from "./GameS25";
import { Location } from "./Location";

export class Rules {
    private message: string = "";
    
    constructor(protected game: GameS25) {}

    /* Private Methods */
    private outOfBounds(location: Location): boolean {
        return location.getRow() < 0 || location.getRow() >= this.game.getGameBoard().getNumRows() ||
               location.getCol() < 0 || location.getCol() >= this.game.getGameBoard().getNumColumns();
    }

    private areInBounds(locationA: Location, locationB: Location): boolean {
        return 0 <= locationA.getCol() && locationA.getCol() < this.game.getGameBoard().getNumColumns() &&
               0 <= locationA.getRow() && locationA.getRow() < this.game.getGameBoard().getNumRows() &&
               0 <= locationB.getCol() && locationB.getCol() < this.game.getGameBoard().getNumColumns() &&
               0 <= locationB.getRow() && locationB.getRow() < this.game.getGameBoard().getNumRows()
    }

    private belongsToCurrentTeam(location: Location): boolean {
        const piece = this.game.getGameBoard().getSquare(location).getPiece();
        return (piece != null && piece.getTeamColor() === this.game.getCurrentTeam().getTeamColor());
    }

    private pieceCanDoAction(location: Location, action: string): boolean {
        const piece = this.game.getGameBoard().getSquare(location).getPiece();
        return (piece != null && piece.allowableAction(action));
    }

    private pieceHasValidMovePath(startLocation: Location, endLocation: Location): boolean {
        const piece = this.game.getGameBoard().getSquare(startLocation).getPiece();
        return (piece != null && piece.validMovePath(startLocation, endLocation));
    }

    private standardChecks(startLocation: Location, endLocation: Location, action: string): boolean {
        return this.areInBounds(startLocation, endLocation) &&
               this.belongsToCurrentTeam(startLocation) &&
               this.pieceCanDoAction(startLocation, action) &&
               this.pieceHasValidMovePath(startLocation, endLocation);
    }

    private isEnemyPieceAt(location: Location) {
        if (this.outOfBounds(location)) return false;
        const piece = this.game.getGameBoard().getSquare(location).getPiece();
        return (piece != null && piece.getTeamColor() === this.game.getOpponentTeam().getTeamColor());
    }
    
    private isNonFriendlyAt(location: Location) {
        if (this.outOfBounds(location)) return false;
        const square = this.game.getGameBoard().getSquare(location);
        const piece = square.getPiece();
        return square.isEmpty() || (piece == null) || piece.getTeamColor() === this.game.getOpponentTeam().getTeamColor();
    }

    /* Direct Getters */
    getMessage(): string { return this.message; }

    /* Long-Evaluation Getters */
    checkValidMove(startLocation: Location, endLocation: Location): boolean {
        const result: boolean =
            this.standardChecks(startLocation, endLocation, "move") &&
            this.game.getGameBoard().getSquare(endLocation).isEmpty();
        this.message = result ? "" : "The piece you are moving does not belong to your team.";
        return result;
    }

    checkValidSpawn(startLocation: Location, endLocation: Location): boolean {
        const result: boolean =
            this.standardChecks(startLocation, endLocation, "spawn") &&
            this.game.getGameBoard().getSquare(endLocation).isEmpty();
        this.message = result ? "" : "The piece you are spawning does not belong to your team.";
        return result;
    }

    checkValidAttack(startLocation: Location, endLocation: Location): boolean {
        const result: boolean =
            this.standardChecks(startLocation, endLocation, "attack") &&
            this.isEnemyPieceAt(endLocation);
        this.message = result ? "" : "The piece you are attacking does not belong to your team.";
        return result;
    }

    checkValidRangedAttack(startLocation: Location, endLocation: Location): boolean {
        const result: boolean =
            this.standardChecks(startLocation, endLocation, "attack") &&
            this.isEnemyPieceAt(endLocation) &&
            Math.sqrt(Math.pow(endLocation.getRow() - startLocation.getRow(), 2) +
                      Math.pow(endLocation.getCol() - startLocation.getCol(), 2)) <= 4;
        this.message = result ? "" : "The piece you are attacking does not belong to your team.";
        return result;
    }

    checkValidRecruit(startLocation: Location, endLocation: Location): boolean {
        const result: boolean =
            this.standardChecks(startLocation, endLocation, "recruit") &&
            this.isEnemyPieceAt(endLocation);
        this.message = result ? "" : "The piece you are recruiting does not belong to your team.";
        return result;
    }

    checkValidCrack(startLocation: Location, endLocation: Location): boolean {
        const result: boolean =
            this.standardChecks(startLocation, endLocation, "crack") &&
            this.isNonFriendlyAt(endLocation);
        this.message = result ? "" : "The piece you are cracking does not belong to your team.";
        return result;
    }
}
