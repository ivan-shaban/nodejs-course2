import createError from 'http-errors'
import { injectable } from 'inversify'

import {
    create,
    deleteByBoardId,
    deleteById,
    getByBoardId,
    getById,
    resetUserId,
    update,
} from './task.db.repository'
import { TaskData } from './task.model'

@injectable()
export class TasksService {
    public getAllTasks = async (boardId: string) =>
        getByBoardId(boardId)

    public getTaskById = async (boardId: string, taskId: string) => {
        const task = await getById(boardId, taskId)
        if (task) {
            return task
        } else {
            throw new createError.NotFound(`No task with board id: ${boardId} and id: "${taskId}" found`)
        }
    }

    public resetTaskUserId = async (userId: string) =>
        resetUserId(userId)

    public createTask = async (boardId: string, taskData: TaskData) =>
        create(boardId, taskData)

    public updateTask = async (boardId: string, taskId: string, taskData: Partial<TaskData>) => {
        const result = await update(boardId, taskId, taskData)
        if (result) {
            return result
        } else {
            throw new createError.NotFound(`No task with board id: ${boardId} and id: "${taskId}" found`)
        }
    }

    public deleteTaskById = async (boardId: string, taskId: string) => {
        const result = await deleteById(boardId, taskId)
        if (result) {
            return result
        } else {
            throw new createError.NotFound(`No task with board id: ${boardId} and id: "${taskId}" found`)
        }
    }

    public deleteTaskByBoardId = async (boardId: string) =>
        deleteByBoardId(boardId)

}
