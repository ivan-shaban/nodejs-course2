import * as express from 'express'
import createError from 'http-errors'

import { LoginService } from '../resources/login/service'
import { iocContainer } from '../di/inversify.config'

export async function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]) {
    if (securityName === 'jwt') {
        const token = request.headers.authorization
        if (token) {
            const loginService = iocContainer.get(LoginService)
            const jwtPayload = loginService.verifyJWT(token)

            return jwtPayload
        }
    }
    throw new createError.Unauthorized('Authentication required')
}
