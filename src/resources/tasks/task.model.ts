import {
    Document,
    model,
    Model,
    Schema,
} from 'mongoose'
import uuid from 'uuid/v4'

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

export interface TaskDocument extends Document, TaskData {
}

export interface TaskModel extends Model<TaskDocument> {
    readonly toDTO: (data: TaskDocument | null) => TaskDTO;
}

const TaskSchema = new Schema({
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: {
        type: String,
        default: uuid,
    },
}, { versionKey: false })

TaskSchema.static('toDTO', (document: TaskDocument | null): TaskDTO | null => {
    if (!document) {
        return document
    }

    const { _id: id, ...rest } = document.toObject()
    return {
        ...rest,
        id,
    }
})

export const Task = model<TaskDocument, TaskModel>('Task', TaskSchema)
