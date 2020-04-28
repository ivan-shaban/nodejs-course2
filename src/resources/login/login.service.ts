import jwt from 'jsonwebtoken'

import { JWTPayload } from '../../common/auth'
import { JWT_SECRET_KEY } from '../../common/config'

export const createJWT = (userId: string, login: string) => {
    const payload: JWTPayload = { userId, login }
    const token = jwt.sign(payload, JWT_SECRET_KEY)

    return token
}
