import { Router } from 'express'

import { handleError } from '../../common/logging'

import { User } from './user.model'
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from './user.service'

export const usersRouter = Router()
    .get('/', handleError(async (req, res) => {
        const users = await getAllUsers()

        res.json(users.map(User.toResponse))
    }))
    .get('/:id', handleError(async (req, res) => {
        const user = await getUserById(req.params.id)

        res.json(User.toResponse(user))
    }))
    .post('/',handleError (async (req, res) => {
        const user = await createUser(req.body)

        res.json(User.toResponse(user))
    }))
    .put('/:id', handleError(async (req, res) => {
        const user = await updateUser(req.params.id, req.body)

        res.json(User.toResponse(user))
    }))
    .delete('/:id', handleError(async (req, res) => {
        const user = await deleteUser(req.params.id)

        res.json(User.toResponse(user))
    }))
