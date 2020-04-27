import { Router } from 'express'

import { handleAsyncError } from '../../common/logging'

import {
    createTask,
    deleteTaskById,
    getAllTasks,
    getTaskById,
    updateTask,
} from './task.service'

export const tasksRouter = Router({ mergeParams: true })
    .get('/', handleAsyncError(async (req, res) => {
        const tasks = await getAllTasks(req.params.boardId)

        res.status(200).json(tasks)
    }))
    .get('/:id', handleAsyncError(async (req, res) => {
        const task = await getTaskById(req.params.boardId, req.params.id)

        res.status(200).json(task)
    }))
    .post('/', handleAsyncError(async (req, res) => {
        const task = await createTask(req.params.boardId, req.body)

        res.status(200).json(task)
    }))
    .put('/:id', handleAsyncError(async (req, res) => {
        const task = await updateTask(req.params.boardId, req.params.id, req.body)

        res.status(200).json(task)
    }))
    .delete('/:id', handleAsyncError(async (req, res) => {
        const task = await deleteTaskById(req.params.boardId, req.params.id)

        res.status(200).json(task)
    }))
