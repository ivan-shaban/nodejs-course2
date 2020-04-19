import { Router } from 'express'

import { tasksRouter } from '../tasks/task.router'
import { handleError } from '../../common/logging'

import {
    createBoard,
    deleteBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
} from './board.service'

export const boardsRouter = Router()
    .get('/', handleError(async (req, res) => {
        const boards = await getAllBoards()

        res.status(200).json(boards)
    }))
    .get('/:id', handleError(async (req, res) => {
        const board = await getBoardById(req.params.id)

        res.status(200).json(board)
    }))
    .post('/', handleError(async (req, res) => {
        const board = await createBoard(req.body)

        res.status(200).json(board)
    }))
    .put('/:id', handleError(async (req, res) => {
        const board = await updateBoard(req.params.id, req.body)

        res.status(200).json(board)
    }))
    .delete('/:id', handleError(async (req, res) => {
        await deleteBoard(req.params.id)

        res.sendStatus(204)
    }))
    .use('/:boardId/tasks', tasksRouter)
