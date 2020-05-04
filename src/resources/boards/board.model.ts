import {
    Document,
    Model,
    model,
    Schema,
} from 'mongoose'
import uuid from 'uuid/v4'

export interface ColumnData {
    readonly _id?: string;
    readonly title: string;
    readonly order: number;
}

const ColumnSchema = new Schema({
    _id: {
        type: String,
        default: uuid,
    },
    title: String,
    order: Number,
}, { versionKey: false })

export interface BoardData {
    readonly title: string;
    readonly columns: ColumnData[];
}

export interface BoardDTO extends BoardData {
    readonly id: string;
}

export interface BoardDocument extends Document, BoardData {
}

export interface BoardModel extends Model<BoardDocument> {
    readonly toDTO: (data: BoardDocument | null) => BoardDTO;
}

const BoardSchema = new Schema({
    _id: {
        type: String,
        default: uuid,
    },
    title: String,
    columns: [ColumnSchema],
}, { versionKey: false })

BoardSchema.static('toDTO', (document: BoardDocument | null): BoardDTO | null => {
    if (!document) {
        return document
    }

    const { _id: id, ...rest } = document.toObject()
    return {
        ...rest,
        id,
    }
})

export const Board = model<BoardDocument, BoardModel>('Board', BoardSchema)
