import uuid from 'uuid/v4'

import {
    Board,
    BoardData,
} from './board.model'

// mock data
export let boards: Board[] = []

// for (let i = 0; i < 10; i++) {
//     boards.push(new Board(i.toString(), {
//         columns: [],
//         title: `BOARD-${i}`,
//     }))
// }

// eslint-disable-next-line @typescript-eslint/require-await
export const getAll = async () => {
    return boards
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getById = async (id: string) =>
    boards.find(({ id: userId }) => userId == id)

// eslint-disable-next-line @typescript-eslint/require-await
export const create = async (boardData: BoardData) => {
    const board = new Board(uuid(), boardData)
    boards.push(board)

    return board
}

export const update = async (id: string, boardData: Partial<BoardData>) => {
    const board = await getById(id)
    if (board) {
        board.update(boardData)
    }

    return board
}

export const remove = async (id: string) => {
    const board = await getById(id)
    boards = boards.filter(({ id: boardId }) => boardId !== id)

    return board
}
