import { Router } from 'express'

import { tasksRouter } from '../tasks/task.router'

import { Board } from './board.model'
import {
    createBoard,
    deleteBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
} from './board.service'

export const boardsRouter = Router()
    .get('/', async (req, res) => {
        const users = await getAllBoards()

        res.json(users.map(Board.toResponse))
    })
    .get('/:id', async (req, res) => {
        const board = await getBoardById(req.params.id)

        if (board) {
            res.json(Board.toResponse(board))
        } else {
            res.sendStatus(404)
        }
    })
    .post('/', async (req, res) => {
        const board = await createBoard(req.body)

        res.json(Board.toResponse(board))
    })
    .put('/:id', async (req, res) => {
        const board = await updateBoard(req.params.id, req.body)

        if (board) {
            res.json(Board.toResponse(board))
        } else {
            res.sendStatus(404)
        }
    })
    .delete('/:id', async (req, res) => {
        const board = await deleteBoard(req.params.id)

        if (board) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })
    .use('/:boardId/tasks', tasksRouter)
