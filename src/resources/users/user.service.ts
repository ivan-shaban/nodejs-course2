import createError from 'http-errors'

import { getTaskByUserId } from '../tasks/task.service'

import {
    create,
    getAll,
    getById,
    remove,
    update,
} from './user.memory.repository'
import { UserData } from './user.model'

export const getAllUsers = () => {
    return getAll()
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
    const tasks = await getTaskByUserId(id)
    tasks.map((task) => task.update({ userId: null }))

    const result = await remove(id)
    if (result) {
        return result
    } else {
        throw new createError.NotFound(`No user with id: "${id}" found`)
    }
}
