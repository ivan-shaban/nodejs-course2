import jwt from 'jsonwebtoken'
import { injectable } from 'inversify'

import { JWT_SECRET_KEY } from '../../common/config'

export interface JWTPayload {
    readonly userId: string;
    readonly login: string;
}

@injectable()
export class LoginService {
    public verifyJWT = (userId: string, login: string) => {
        const payload: JWTPayload = { userId, login }
        const token = jwt.sign(payload, JWT_SECRET_KEY)

        return token
    }

    public createJWT = (userId: string, login: string) => {
        const payload: JWTPayload = { userId, login }
        const token = jwt.sign(payload, JWT_SECRET_KEY)

        return token
    }
}
