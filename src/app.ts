import path from 'path'

import express from 'express'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

import { usersRouter } from './resources/users/user.router'
import { boardsRouter } from './resources/boards/board.router'
import {
    errorHandlerMiddleware,
    logger,
    uncaughtExceptionLisneter,
    unhandledRejectionListener,
} from './common/logging'
import { authMiddleware } from './common/auth'
import { Routes } from './constants/routes'
import { loginRouter } from './resources/login/login.router'

process
    .on('uncaughtException', uncaughtExceptionLisneter)
    .on('unhandledRejection', unhandledRejectionListener)

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'))

// TODO: add helmet
export const app = express()
    .use(express.json())
    .use(logger)
    .use(authMiddleware)
    .use(Routes.DOCS, swaggerUI.serve, swaggerUI.setup(swaggerDocument))
    .use(Routes.ROOT, (req, res, next) => {
        if (req.originalUrl === Routes.ROOT) {
            res.send('Service is running!')
            return
        }
        next()
    })
    .use(Routes.USERS, usersRouter)
    .use(Routes.BOARDS, boardsRouter)
    .use(Routes.LOGIN, loginRouter)
    .use(errorHandlerMiddleware)
