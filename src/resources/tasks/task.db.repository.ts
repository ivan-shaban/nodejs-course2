import {
    Task,
    TaskData,
    TaskModel,
} from './model'

export const getAll = async () => {
    const tasks = await TaskModel.find()

    return tasks.map(Task.toDTO)
}

export const getByBoardId = async (boardId: string) => {
    const tasks = await TaskModel.find({ boardId })

    return tasks.map(Task.toDTO)
}

export const getById = async (boardId: string, taskId: string) => {
    const tasks = await getByBoardId(boardId)
    return tasks.find(({ id }) => taskId === id)
}

export const create = async (boardId: string, taskData: TaskData) => {
    const task = await TaskModel.create({
        ...taskData,
        boardId,
    })

    return Task.toDTO(task)
}

export const update = async (boardId: string, taskId: string, taskData: Partial<TaskData>) => {
    const task = await TaskModel.findOneAndUpdate({ _id: taskId, boardId }, taskData)

    return task && Task.toDTO(task)
}

export const resetUserId = async (userId: string) => {
    const { ok } = await TaskModel.updateMany({ userId }, { userId: undefined })

    return !!ok
}

export const deleteById = async (boardId: string, taskId: string) => {
    const task = await TaskModel.findOneAndDelete({ _id: taskId, boardId })

    return task && Task.toDTO(task)
}

export const deleteByBoardId = async (boardId: string) => {
    const { ok } = await TaskModel.deleteMany({ boardId })

    return !!ok
}
