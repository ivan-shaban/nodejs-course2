import uuid from 'uuid/v4'
import {
    arrayProp,
    DocumentType,
    getModelForClass,
    modelOptions,
    prop,
} from '@typegoose/typegoose'

export interface ColumnData {
    readonly _id?: string;
    readonly title: string;
    readonly order: number;
}

export interface BoardData {
    readonly title: string;
    readonly columns: ColumnData[];
}

export interface BoardDTO extends BoardData {
    readonly id: string;
}

@modelOptions({ schemaOptions: { versionKey: false } })
class Column implements ColumnData {
    @prop({ required: true })
    public title!: string
    @prop({ required: true })
    public order!: number
    @prop({ default: uuid })
    public _id?: string
}

@modelOptions({ schemaOptions: { versionKey: false } })
export class Board implements BoardData {
    @prop({ required: true })
    public title!: string
    @arrayProp({ required: true, items: Column })
    public columns!: Column[]
    @prop({ default: uuid })
    public _id!: string

    public static toDTO = (document: DocumentType<Board>) => {
        const { _id: id, ...rest } = document.toObject()
        return {
            ...rest,
            id,
        } as BoardDTO
    }
}

export const BoardModel = getModelForClass(Board)
