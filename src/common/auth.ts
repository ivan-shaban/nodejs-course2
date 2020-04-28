import { RequestHandler } from 'express'
import passport from 'passport'
import {
    ExtractJwt,
    Strategy as JwtStrategy,
    StrategyOptions,
} from 'passport-jwt'
import {
    IStrategyOptionsWithRequest,
    Strategy as LocalStrategy,
} from 'passport-local'

import { Routes } from '../constants/routes'
import {
    createUser,
    getUserByCredentials,
    getUserById,
} from '../resources/users/user.service'

import { JWT_SECRET_KEY } from './config'

export interface JWTPayload {
    readonly userId: string;
    readonly login: string;
}

const publicRoutes = [
    Routes.ROOT,
    Routes.DOCS,
    Routes.LOGIN,
]

const localStrategyOptions: IStrategyOptionsWithRequest = {
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true,
}

// Create a passport middleware to handle user registration
passport.use('registration', new LocalStrategy(
    localStrategyOptions,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (req, login, password, done) => {
        try {
            const user = await createUser(req.body)
            // Send the user information to the next middleware
            done(null, user)
        } catch (error) {
            done(error)
        }
    }))

// Create a passport middleware to handle User login
passport.use('login', new LocalStrategy(
    localStrategyOptions,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (req, login, password, done) => {
        try {
            // Find the user associated with the email provided by the user
            const user = await getUserByCredentials(login, password)
            // Send the user information to the next middleware
            done(null, user, { message: 'Logged in Successfully' })
        } catch (error) {
            done(error)
        }
    }))

const JWTStrategyOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET_KEY,
}
// Create a passport middleware to handle User authentication
passport.use(new JwtStrategy(
    JWTStrategyOptions,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async ({ userId }: JWTPayload, done) => {
        try {
            // Find the user associated with the email provided by the user
            const user = await getUserById(userId)
            // Send the user information to the next middleware
            done(null, user)
        } catch (error) {
            done(error)
        }
    }))

const passportAuthenticateMiddleware = passport.authenticate('jwt', { session: false })

export const authMiddleware: RequestHandler = (req, res, next) => {
    const isPublicRoute = publicRoutes.some((path) => req.originalUrl.startsWith(path))
    if (isPublicRoute) {
        next()
    } else {
        passportAuthenticateMiddleware(req, res, next)
    }
}
