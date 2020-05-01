import { promisify } from 'util'

import jwt from 'jsonwebtoken'
import { injectable } from 'inversify'
import { verify } from 'jsonwebtoken'

import { JWT_SECRET_KEY } from '../../common/config'

export interface JWTPayload {
    readonly userId: string;
    readonly login: string;
}

const verifyJWT = promisify(verify)

@injectable()
export class LoginService {
    public verifyJWT = async (token: string) => {
        const bearerToken = token.split(' ')[1]
        const payload = await verifyJWT(bearerToken, JWT_SECRET_KEY) as JWTPayload

        return payload
    }

    public createJWT = (userId: string, login: string) => {
        const payload: JWTPayload = { userId, login }
        const token = jwt.sign(payload, JWT_SECRET_KEY)

        return token
    }
}
