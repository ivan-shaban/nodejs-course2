import path from 'path'

import express from 'express'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

import { usersRouter } from './resources/users/user.router'
import { boardsRouter } from './resources/boards/board.router'

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'))

export const app = express()
    .use(express.json())
    .use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
    .use('/', (req, res, next) => {
        if (req.originalUrl === '/') {
            res.send('Service is running!')
            return
        }
        next()
    })
    .use('/users', usersRouter)
    .use('/boards', boardsRouter)
