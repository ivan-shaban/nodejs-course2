import {
    ErrorRequestHandler,
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express'

export const logger: RequestHandler = (req, res, next) => {
    let queryParams = Object.keys(req.query).map((key) =>
        `\t${key}: ${JSON.stringify(req.query[key])}`,
    ).join('\n')
    queryParams = queryParams
        ? `\n   query: \n${queryParams}`
        : '\n   no query params found'

    let body = Object.keys(req.body).map((key) =>
        `\t${key}: ${JSON.stringify(req.body[key])}`,
    ).join('\n')
    body = body
        ? `\n   body: \n${body}`
        : '\n   no body found'

    console.log(`>> ${req.method}: ${req.path}${queryParams}${body}`)

    next()
}

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    const status = err.status || 500
    const message = err.name === 'ValidateError'
        ? `ValidateError: ${err.fields}`
        : err.message

    console.error(`>> error: ${status}: ${message}`, err)

    res
        .status(status)
        .send({ message: message })

    next()
}

export const uncaughtExceptionLisneter: NodeJS.UncaughtExceptionListener = (error) => {
    console.error('>> error:', error)
    process.exit(1)
}

export const unhandledRejectionListener: NodeJS.UnhandledRejectionListener = (reason) => {
    console.error('>> error:', reason)
    process.exit(1)
}
