import { Router } from 'express'

import { handleError } from '../../common/logging'

import { Task } from './task.model'
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

        res.json(tasks.map(Task.toResponse))
    }))
    .get('/:id', handleError(async (req, res) => {
        const task = await getTaskById(req.params.boardId, req.params.id)

        res.json(Task.toResponse(task))
    }))
    .post('/', handleError(async (req, res) => {
        const task = await createTask(req.params.boardId, req.body)

        res.json(Task.toResponse(task))
    }))
    .put('/:id', handleError(async (req, res) => {
        const task = await updateTask(req.params.boardId, req.params.id, req.body)

        res.json(Task.toResponse(task))
    }))
    .delete('/:id', handleError(async (req, res) => {
        const task = await deleteTaskById(req.params.boardId, req.params.id)

        res.json(Task.toResponse(task))
    }))
