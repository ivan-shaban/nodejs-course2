import { Router } from 'express'

import { tasksRouter } from '../tasks/task.router'
import { handleAsyncError } from '../../common/logging'
import { Routes } from '../../constants/routes'

import {
    createBoard,
    deleteBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
} from './board.service'

export const boardsRouter = Router()
    .get('/', handleAsyncError(async (req, res) => {
        const boards = await getAllBoards()

        res.status(200).json(boards)
    }))
    .get('/:id', handleAsyncError(async (req, res) => {
        const board = await getBoardById(req.params.id)

        res.status(200).json(board)
    }))
    .post('/', handleAsyncError(async (req, res) => {
        const board = await createBoard(req.body)

        res.status(200).json(board)
    }))
    .put('/:id', handleAsyncError(async (req, res) => {
        const board = await updateBoard(req.params.id, req.body)

        res.status(200).json(board)
    }))
    .delete('/:id', handleAsyncError(async (req, res) => {
        await deleteBoard(req.params.id)

        res.sendStatus(204)
    }))
    .use(`/:boardId${Routes.TASKS}`, tasksRouter)
