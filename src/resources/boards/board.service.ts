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

export const getBoardById = (id: string) =>
    getById(id)

export const createBoard = (userData: BoardData) =>
    create(userData)

export const updateBoard = (id: string, userData: Partial<BoardData>) =>
    update(id, userData)

export const deleteBoard = async (id: string) =>{
    await deleteTaskByBoardId(id)
    return remove(id)
}
