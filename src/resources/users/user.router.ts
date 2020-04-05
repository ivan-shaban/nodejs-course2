import { Router } from 'express'

import { User } from './user.model'
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from './user.service'

export const usersRouter = Router()
    .get('/', async (req, res) => {
        const users = await getAllUsers()

        res.json(users.map(User.toResponse))
    })
    .get('/:id', async (req, res) => {
        const user = await getUserById(req.params.id)

        if (user) {
            res.json(User.toResponse(user))
        } else {
            res.sendStatus(404)
        }
    })
    .post('/', async (req, res) => {
        const user = await createUser(req.body)

        res.json(User.toResponse(user))
    })
    .put('/:id', async (req, res) => {
        const user = await updateUser(req.params.id, req.body)

        if (user) {
            res.json(User.toResponse(user))
        } else {
            res.sendStatus(404)
        }
    })
    .delete('/:id', async (req, res) => {
        const user = await deleteUser(req.params.id)

        if (user) {
            res.json(User.toResponse(user))
        } else {
            res.sendStatus(404)
        }
    })
