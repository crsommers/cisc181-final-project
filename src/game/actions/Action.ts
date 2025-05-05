import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";

export abstract class Action {
    constructor(
        protected game: GameS25,
        protected startLocation: Location,
        protected endLocation: Location,
    ) {}

    /* Abstract Methods */
    abstract validAction(): boolean;
    abstract performAction(): void;
}