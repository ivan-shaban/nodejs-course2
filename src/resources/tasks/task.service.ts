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

export const getAllTasks = (boardId: string) =>
    getByBoardId(boardId)

export const getTaskById = (boardId: string, taskId: string) =>
    getById(boardId, taskId)

export const getTaskByUserId = (userId: string) =>
    getByUserId(userId)

export const createTask = (boardId: string, taskData: TaskData) =>
    create(boardId, taskData)

export const updateTask = (boardId: string, taskId: string, taskData: Partial<TaskData>) =>
    update(boardId, taskId, taskData)

export const deleteTaskById = (boardId: string, taskId: string) =>
    deleteById(boardId, taskId)

export const deleteTaskByBoardId = (boardId: string) =>
    deleteByBoardId(boardId)
