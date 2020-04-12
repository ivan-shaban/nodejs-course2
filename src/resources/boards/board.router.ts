import { Router } from 'express'

import { tasksRouter } from '../tasks/task.router'
import { handleError } from '../../common/logging'

import { Board } from './board.model'
import {
    createBoard,
    deleteBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
} from './board.service'

export const boardsRouter = Router()
    .get('/', handleError(async (req, res) => {
        const users = await getAllBoards()

        res.json(users.map(Board.toResponse))
    }))
    .get('/:id', handleError(async (req, res) => {
        const board = await getBoardById(req.params.id)

        res.json(Board.toResponse(board))
    }))
    .post('/', handleError(async (req, res) => {
        const board = await createBoard(req.body)

        res.json(Board.toResponse(board))
    }))
    .put('/:id', handleError(async (req, res) => {
        const board = await updateBoard(req.params.id, req.body)

        res.json(Board.toResponse(board))
    }))
    .delete('/:id', handleError(async (req, res) => {
        await deleteBoard(req.params.id)

        res.sendStatus(204)
    }))
    .use('/:boardId/tasks', tasksRouter)
