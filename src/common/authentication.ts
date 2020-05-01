import { promisify } from 'util'

import * as express from 'express'
import { verify } from 'jsonwebtoken'
import createError from 'http-errors'

import { JWTPayload } from '../resources/login/service'

import { JWT_SECRET_KEY } from './config'

const verifyJWT = promisify(verify)

export async function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]) {
    if (securityName === 'jwt') {
        const token = request.headers.authorization
        if (token) {
            const bearerToken = token.split(' ')[1]
            const jwtPayload = await verifyJWT(bearerToken, JWT_SECRET_KEY) as JWTPayload

            return jwtPayload
        }
    }
    throw new createError.Unauthorized('Authentication required')
}
