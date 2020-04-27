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
import createError from 'http-errors'

import { Routes } from '../constants/routes'
import { User } from '../resources/users/user.model'
import { createUser } from '../resources/users/user.service'

import { JWT_SECRET_KEY } from './config'

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
            const user = await User.findOne({ login })
            if (!user || !(await user.isValidPassword(password))) {
                done(new createError.Forbidden('Login or password incorrect.'))
            } else {
                // Send the user information to the next middleware
                done(null, user, { message: 'Logged in Successfully' })
            }
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
    ((jwt_payload, done) => {
        User.findOne({ id: jwt_payload.sub }, (err, user) => {
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
                // or you could create a new account
            }
        })
    })))

const passportAuthenticateMiddleware = passport.authenticate('jwt', { session: false })

export const authMiddleware: RequestHandler = (req, res, next) => {
    if (publicRoutes.includes(req.originalUrl as Routes) || req.originalUrl.startsWith(Routes.DOCS)) {
        next()
    } else {
        passportAuthenticateMiddleware(req, res, next)
    }
}
