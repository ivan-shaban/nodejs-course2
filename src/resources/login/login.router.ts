import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { JWT_SECRET_KEY } from '../../common/config'
import { UserOutputData } from '../users/user.model'
import { JWTPayload } from '../../common/auth'

export const loginRouter = Router()
    .post('/',
        passport.authenticate('login', { session: false }),
        (req, res) => {
            const { id: userId, login } = req.user as UserOutputData
            const payload: JWTPayload = { userId, login }
            const token = jwt.sign(payload, JWT_SECRET_KEY)

            res.status(200).json({ token })
        })
