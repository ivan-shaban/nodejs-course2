import createError from 'http-errors'

import {
    create,
    deleteByBoardId,
    deleteById,
    getByBoardId,
    getById,
    getByUserId,
    update,
} from './task.memory.repository'
import { TaskData } from './task.model'

export const getAllTasks = async (boardId: string) => {
    return getByBoardId(boardId)
}

export const getTaskById = async (boardId: string, taskId: string) => {
    const task = await getById(boardId, taskId)
    if (task) {
        return task
    } else {
        throw new createError.NotFound(`No task with board id: ${boardId} and id: "${taskId}" found`)
    }
}

export const getTaskByUserId = async (userId: string) => {
    return await getByUserId(userId)
}

export const createTask = async (boardId: string, taskData: TaskData) => {
    return create(boardId, taskData)
}

export const updateTask = async (boardId: string, taskId: string, taskData: Partial<TaskData>) => {
    const result = await update(boardId, taskId, taskData)
    if (result) {
        return result
    } else {
        throw new createError.NotFound(`No task with board id: ${boardId} and id: "${taskId}" found`)
    }
}

export const deleteTaskById = async (boardId: string, taskId: string) => {
    const result = await deleteById(boardId, taskId)
    if (result) {
        return result
    } else {
        throw new createError.NotFound(`No task with board id: ${boardId} and id: "${taskId}" found`)
    }
}

export const deleteTaskByBoardId = async (boardId: string) => {
    return deleteByBoardId(boardId)
}
