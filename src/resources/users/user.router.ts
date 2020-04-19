import { Router } from 'express'

import { handleError } from '../../common/logging'

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

        res.status(200).json(users)
    }))
    .get('/:id', handleError(async (req, res) => {
        const user = await getUserById(req.params.id)

        res.status(200).json(user)
    }))
    .post('/',handleError (async (req, res) => {
        const user = await createUser(req.body)

        res.status(200).json(user)
    }))
    .put('/:id', handleError(async (req, res) => {
        const user = await updateUser(req.params.id, req.body)

        res.status(200).json(user)
    }))
    .delete('/:id', handleError(async (req, res) => {
        const user = await deleteUser(req.params.id)

        res.status(200).json(user)
    }))
