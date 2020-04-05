export interface ColumnData {
    readonly id: string;
    readonly title: string;
    readonly order: string;
}

export interface BoardData {
    readonly columns: ColumnData[];
    readonly title: string;
}

export class Board implements BoardData {
    public id: string
    public title: string
    public columns: ColumnData[]

    constructor(id: string, data: BoardData) {
        this.id = id
        this.title = data.title
        this.columns = data.columns
    }

    public update = (data: Partial<BoardData>) => {
        for (const prop in data) {
            // @ts-ignore
            this[prop] = data[prop]
        }
    }

    public static toResponse = (board: Board) => {
        return board
    }
}
