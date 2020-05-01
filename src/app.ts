import express from 'express'
import swaggerUI from 'swagger-ui-express'

import swaggerDocument from '../doc/swagger.json'

import {
    errorHandlerMiddleware,
    logger,
    uncaughtExceptionLisneter,
    unhandledRejectionListener,
} from './common/logging'
import { Routes } from './constants/routes'
import { RegisterRoutes } from './router/routes'

process
    .on('uncaughtException', uncaughtExceptionLisneter)
    .on('unhandledRejection', unhandledRejectionListener)

export const app = express()
    .use(express.json())
    .use(logger)
    .use(Routes.DOCS, swaggerUI.serve, swaggerUI.setup(swaggerDocument))
    .use(Routes.ROOT, (req, res, next) => {
        if (req.originalUrl === Routes.ROOT) {
            res.send('Service is running!')
            return
        }
        next()
    })

RegisterRoutes(app)

app.use(errorHandlerMiddleware)
