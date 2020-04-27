import createError from 'http-errors'

import { resetTaskUserId } from '../tasks/task.service'

import {
    create,
    getAll,
    getByCredentials,
    getById,
    remove,
    update,
} from './user.db.repository'
import { UserData } from './user.model'

export const getAllUsers = () => {
    return getAll()
}

export const getUserByCredentials = async (login: string, password: string) => {
    const user = await getByCredentials(login, password)
    if (user) {
        return user
    } else {
        throw new createError.Forbidden('Login or password incorrect.')
    }
}

export const getUserById = async (id: string) => {
    const user = await getById(id)
    if (user) {
        return user
    } else {
        throw new createError.NotFound(`No user with id: "${id}" found`)
    }
}

export const createUser = async (userData: UserData) => {
    return create(userData)
}

export const updateUser = async (id: string, userData: Partial<UserData>) => {
    const result = await update(id, userData)
    if (result) {
        return result
    } else {
        throw new createError.NotFound(`No user with id: "${id}" found`)
    }
}

export const deleteUser = async (id: string) => {
    await resetTaskUserId(id)

    const result = await remove(id)
    if (result) {
        return result
    } else {
        throw new createError.NotFound(`No user with id: "${id}" found`)
    }
}
