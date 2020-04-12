import createError from 'http-errors'

import { deleteTaskByBoardId } from '../tasks/task.service'

import {
    create,
    getAll,
    getById,
    remove,
    update,
} from './board.memory.repository'
import { BoardData } from './board.model'

export const getAllBoards = () =>
    getAll()

export const getBoardById = async (id: string) => {
    const board = await getById(id)
    if (board) {
        return board
    } else {
        throw new createError.NotFound(`No board with id: "${id}" found`)
    }
}

export const createBoard = (userData: BoardData) => {
    return create(userData)
}

export const updateBoard = async (id: string, userData: Partial<BoardData>) => {
    const result = await update(id, userData)
    if (result) {
        return result
    } else {
        throw new createError.NotFound(`No board with id: "${id}" found`)
    }
}

export const deleteBoard = async (id: string) => {
    await deleteTaskByBoardId(id)
    const result = await remove(id)
    if (result) {
        return result
    } else {
        throw new createError.NotFound(`No board with id: "${id}" found`)
    }
}
