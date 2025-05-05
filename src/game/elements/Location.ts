export class Location {
    constructor(
        private row: number,
        private col: number,
    ) {}

    /* Direct Getters */
    getRow(): number { return this.row; }
    getCol(): number { return this.col; }

    /* Setters */
    setRow(row: number): void { this.row = row; }
    setCol(col: number): void { this.col = col; }
}
