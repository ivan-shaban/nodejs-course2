import uuid from 'uuid/v4'

import {
    User,
    UserData,
} from './user.model'

// mock data
export let users: User[] = []

// for (let i = 0; i < 10; i++) {
//     users.push(new User(i.toString(), {
//         name: `USER-${i}`,
//         login: `USER-${i}`,
//         password: 'tests',
//     }))
// }

// eslint-disable-next-line @typescript-eslint/require-await
export const getAll = async () => {
    return users
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getById = async (id: string) =>
    users.find(({ id: userId }) => userId == id)!

// eslint-disable-next-line @typescript-eslint/require-await
export const create = async (userData: UserData) => {
    const user = new User(uuid(), userData)
    users.push(user)

    return user
}

export const update = async (id: string, userData: Partial<UserData>) => {
    const user = await getById(id)
    user.update(userData)

    return user
}

export const remove = async (id: string) => {
    const user = await getById(id)
    users = users.filter(({ id: userId }) => userId !== id)

    return user
}
