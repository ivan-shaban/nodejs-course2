import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import {
    User,
    UserDocument,
} from '../users/user.model'
import { JWT_SECRET_KEY } from '../../common/config'

export const loginRouter = Router()
    .post('/',
        passport.authenticate('login', { session: false }),
        (req, res) => {
            const { id: userId, login } = User.toResponse(req.user as UserDocument)
            const token = jwt.sign({ userId, login }, JWT_SECRET_KEY)

            res.status(200).json({ token })
        })
