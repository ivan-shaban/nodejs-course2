import uuid from 'uuid/v4'
import {
    DocumentType,
    getModelForClass,
    modelOptions,
    prop,
} from '@typegoose/typegoose'

export interface TaskData {
    readonly   title: string;
    readonly   order: number;
    readonly   description: string;
    /**
     * assignee
     */
    readonly   userId?: string;
    readonly   boardId?: string;
    readonly   columnId?: string;
}

export interface TaskDTO extends TaskData {
    readonly id: string;
}

@modelOptions({ schemaOptions: { versionKey: false } })
export class Task {
    @prop({ required: true })
    public title!: string
    @prop({ required: true })
    public order!: number
    @prop({ required: true })
    public description!: string
    /**
     * assignee
     */
    @prop()
    public userId!: string
    @prop()
    public boardId!: string
    @prop()
    public columnId!: string
    @prop({ default: uuid })
    public _id!: string

    public static toDTO = (document: DocumentType<Task>) => {
        const { _id: id, ...rest } = document.toObject()
        return {
            ...rest,
            id,
        } as TaskDTO
    }
}

export const TaskModel = getModelForClass(Task)
