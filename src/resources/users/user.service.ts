import {
    create,
    getAll,
    getById,
    remove,
    update,
} from './user.memory.repository'
import { UserData } from './user.model'
import { getTaskByUserId } from '../tasks/task.service'

export const getAllUsers = () =>
    getAll()

export const getUserById = (id: string) =>
    getById(id)

export const createUser = (userData: UserData) =>
    create(userData)

export const updateUser = (id: string, userData: Partial<UserData>) =>
    update(id, userData)

export const deleteUser = async (id: string) => {
    const tasks = await getTaskByUserId(id)
    tasks.map((task) => task.update({ userId: null }))

    return remove(id)
}
