import {
    Task,
    TaskData,
} from './task.model'

export const getAll = async () => {
    const tasks = await Task.find()

    return tasks.map(Task.toResponse)
}

export const getByBoardId = async (boardId: string) => {
    const tasks = await Task.find({ boardId })

    return tasks.map(Task.toResponse)
}

export const getById = async (boardId: string, taskId: string) => {
    const tasks = await getByBoardId(boardId)
    return tasks.find(({ id }) => taskId === id)
}

export const create = async (boardId: string, taskData: TaskData) => {
    const task = await Task.create({
        ...taskData,
        boardId,
    })

    return Task.toResponse(task)
}

export const update = async (boardId: string, taskId: string, taskData: Partial<TaskData>) => {
    const task = await Task.findOneAndUpdate({ _id: taskId, boardId }, taskData)

    return Task.toResponse(task)
}

export const resetUserId = async (userId: string) => {
    const { ok } = await Task.updateMany({ userId }, { userId: undefined })

    return !!ok
}

export const deleteById = async (boardId: string, taskId: string) => {
    const task = await Task.findOneAndDelete({ _id: taskId, boardId })

    return Task.toResponse(task)
}

export const deleteByBoardId = async (boardId: string) => {
    const { ok } = await Task.deleteMany({ boardId })

    return !!ok
}
