import createError from 'http-errors'
import {
    inject,
    injectable,
} from 'inversify'

import { TasksService } from '../tasks/service'

import {
    create,
    getAll,
    getById,
    remove,
    update,
} from './board.db.repository'
import { BoardData } from './model'

@injectable()
export class BoardsService {
    @inject(TasksService)
    private readonly tasksService!: TasksService

    public getAllBoards = () => {
        return getAll()
    }

    public getBoardById = async (id: string) => {
        const board = await getById(id)
        if (board) {
            return board
        } else {
            throw new createError.NotFound(`No board with id: "${id}" found`)
        }
    }

    public createBoard = (data: BoardData) => {
        return create(data)
    }

    public updateBoard = async (id: string, data: Partial<BoardData>) => {
        const result = await update(id, data)
        if (result) {
            return result
        } else {
            throw new createError.NotFound(`No board with id: "${id}" found`)
        }
    }

    public deleteBoard = async (id: string) => {
        await this.tasksService.deleteTaskByBoardId(id)

        const result = await remove(id)
        if (result) {
            return result
        } else {
            throw new createError.NotFound(`No board with id: "${id}" found`)
        }
    }
}
