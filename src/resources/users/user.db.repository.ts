import {
    User,
    UserData,
} from './user.model'

export const getAll = async () => {
    const users = await User.find()
    return users.map(User.toResponse)
}

export const getById = async (id: string) => {
    const user = await User.findById(id)

    return User.toResponse(user)
}

export const getByCredentials = async (login: string, password: string) => {
    const user = await User.findOne({ login })
    const passIsValid = user !== null && (await user.isValidPassword(password))

    return passIsValid ? User.toResponse(user) : null
}

export const create = async (userData: UserData) => {
    const user = await User.create(userData)

    return User.toResponse(user)
}

export const update = async (id: string, userData: Partial<UserData>) => {
    const user = await User.findByIdAndUpdate(id, userData)

    return User.toResponse(user)
}

export const remove = async (id: string) => {
    const user = await User.findByIdAndDelete(id)

    return User.toResponse(user)
}
