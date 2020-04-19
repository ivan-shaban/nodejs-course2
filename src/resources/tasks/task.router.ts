import { Router } from 'express'

import { handleError } from '../../common/logging'

import {
    createTask,
    deleteTaskById,
    getAllTasks,
    getTaskById,
    updateTask,
} from './task.service'

export const tasksRouter = Router({ mergeParams: true })
    .get('/', handleError(async (req, res) => {
        const tasks = await getAllTasks(req.params.boardId)

        res.status(200).json(tasks)
    }))
    .get('/:id', handleError(async (req, res) => {
        const task = await getTaskById(req.params.boardId, req.params.id)

        res.status(200).json(task)
    }))
    .post('/', handleError(async (req, res) => {
        const task = await createTask(req.params.boardId, req.body)

        res.status(200).json(task)
    }))
    .put('/:id', handleError(async (req, res) => {
        const task = await updateTask(req.params.boardId, req.params.id, req.body)

        res.status(200).json(task)
    }))
    .delete('/:id', handleError(async (req, res) => {
        const task = await deleteTaskById(req.params.boardId, req.params.id)

        res.status(200).json(task)
    }))
