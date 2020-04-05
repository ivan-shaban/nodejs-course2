import { Router } from 'express'

import { Task } from './task.model'
import {
    createTask,
    deleteTaskById,
    getAllTasks,
    getTaskById,
    updateTask,
} from './task.service'

export const tasksRouter = Router({ mergeParams: true })
    .get('/', async (req, res) => {
        const tasks = await getAllTasks(req.params.boardId)

        res.json(tasks.map(Task.toResponse))
    })
    .get('/:id', async (req, res) => {
        const task = await getTaskById(req.params.boardId, req.params.id)

        if (task) {
            res.json(Task.toResponse(task))
        } else {
            res.sendStatus(404)
        }
    })
    .post('/', async (req, res) => {
        const task = await createTask(req.params.boardId, req.body)

        res.json(Task.toResponse(task))
    })
    .put('/:id', async (req, res) => {
        const task = await updateTask(req.params.boardId, req.params.id, req.body)

        if (task) {
            res.json(Task.toResponse(task))
        } else {
            res.sendStatus(404)
        }
    })
    .delete('/:id', async (req, res) => {
        const task = await deleteTaskById(req.params.boardId, req.params.id)

        if (task) {
            res.json(Task.toResponse(task))
        } else {
            res.sendStatus(404)
        }
    })
