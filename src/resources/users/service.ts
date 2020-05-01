import createError from 'http-errors'
import {
    inject,
    injectable,
} from 'inversify'

import { TasksService } from '../tasks/service'

import {
    create,
    getAll,
    getByCredentials,
    getById,
    remove,
    update,
} from './user.db.repository'
import { UserData } from './user.model'

@injectable()
export class UsersService {
    @inject(TasksService)
    private tasksService!: TasksService

    public getAllUsers = () => {
        return getAll()
    }

    public getUserByCredentials = async (login: string, password: string) => {
        const user = await getByCredentials(login, password)
        if (user) {
            return user
        } else {
            throw new createError.Forbidden('Login or password incorrect.')
        }
    }

    public getUserById = async (id: string) => {
        const user = await getById(id)
        if (user) {
            return user
        } else {
            throw new createError.NotFound(`No user with id: "${id}" found`)
        }
    }

    public createUser = async (userData: UserData) => {
        return create(userData)
    }

    public updateUser = async (id: string, userData: Partial<UserData>) => {
        const result = await update(id, userData)
        if (result) {
            return result
        } else {
            throw new createError.NotFound(`No user with id: "${id}" found`)
        }
    }

    public deleteUser = async (id: string) => {
        await this.tasksService.resetTaskUserId(id)

        const result = await remove(id)
        if (result) {
            return result
        } else {
            throw new createError.NotFound(`No user with id: "${id}" found`)
        }
    }
}
