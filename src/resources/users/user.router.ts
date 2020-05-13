import { Router } from 'express'
import passport from 'passport'

import { handleAsyncError } from '../../common/logging'

import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from './user.service'

export const usersRouter = Router()
    .get('/', handleAsyncError(async (req, res) => {
        const users = await getAllUsers()

        res.status(200).json(users)
    }))
    .get('/:id', handleAsyncError(async (req, res) => {
        const user = await getUserById(req.params.id)

        res.status(200).json(user)
    }))
    .post('/',
        passport.authenticate('registration', { session: false }),
        (req, res) => {
            res.status(200).json(req.user)
        })
    .put('/:id', handleAsyncError(async (req, res) => {
        const user = await updateUser(req.params.id, req.body)

        res.status(200).json(user)
    }))
    .delete('/:id', handleAsyncError(async (req, res) => {
        const user = await deleteUser(req.params.id)

        res.status(200).json(user)
    }))
