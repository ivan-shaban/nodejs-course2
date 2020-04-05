import uuid from 'uuid/v4'

import {
    Task,
    TaskData,
} from './task.model'

// mock data
export let tasks: Task[] = []

// for (let i = 0; i < 10; i++) {
//     tasks.push(new Task(i.toString(), {
//         title: `TASK-${i}`,
//         description: 'description',
//         order: 'order',
//         boardId: i.toString(),
//         userId: i.toString(),
//         columnId: i.toString(),
//     }))
// }

// eslint-disable-next-line @typescript-eslint/require-await
export const getAll = async () =>
    tasks

// eslint-disable-next-line @typescript-eslint/require-await
export const getByBoardId = async (boardId: string) => {
    return tasks.filter(({ boardId: taskBoardId }) => taskBoardId === boardId)
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getById = async (boardId: string, taskId: string) => {
    const tasks = await getByBoardId(boardId)
    return tasks.find(({ id }) => taskId === id)
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getByUserId = async (userId: string) =>
    tasks.filter(({ userId: taskUserId }) => taskUserId === userId)

// eslint-disable-next-line @typescript-eslint/require-await
export const create = async (boardId: string, taskData: TaskData) => {
    const task = new Task(uuid(), {
        ...taskData,
        boardId,
    })
    tasks.push(task)

    return task
}

export const update = async (boardId: string, taskId: string, taskData: Partial<TaskData>) => {
    const task = await getById(boardId, taskId)
    if (task) {
        task.update(taskData)
    }

    return task
}

export const deleteById = async (boardId: string, taskId: string) => {
    const task = await getById(boardId, taskId)
    tasks = tasks.filter(({ id }) => id !== taskId)

    return task
}

// eslint-disable-next-line @typescript-eslint/require-await
export const deleteByBoardId = async (boardId: string) => {
    tasks = tasks.filter(({ boardId: taskBoardId }) => taskBoardId !== boardId)
}
