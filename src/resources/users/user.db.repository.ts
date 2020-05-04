import {
    UserModel,
    UserData,
    User,
} from './model'

export const getAll = async () => {
    const users = await UserModel.find()
    return users.map(User.toDTO)
}

export const getById = async (id: string) => {
    const user = await UserModel.findById(id)

    return user && User.toDTO(user)
}

export const getByCredentials = async (login: string, password: string) => {
    const user = await UserModel.findOne({ login })
    const passIsValid = user !== null && (await user.isValidPassword(password))

    return passIsValid ? User.toDTO(user!) : null
}

export const create = async (userData: UserData) => {
    const user = await UserModel.create(userData)

    return User.toDTO(user)
}

export const update = async (id: string, userData: Partial<UserData>) => {
    const user = await UserModel.findByIdAndUpdate(id, userData)

    return user && User.toDTO(user)
}

export const remove = async (id: string) => {
    const user = await UserModel.findByIdAndDelete(id)

    return user && User.toDTO(user)
}
