import { Router } from 'express'
import passport from 'passport'

import { UserOutputData } from '../users/user.model'

import { createJWT } from './login.service'

export const loginRouter = Router()
    .post('/',
        passport.authenticate('login', { session: false }),
        (req, res) => {
            const { id, login } = req.user as UserOutputData
            const token = createJWT(id, login)

            res.status(200).json({ token })
        })
