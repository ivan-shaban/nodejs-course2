import {
    Board,
    BoardData,
} from './board.model'

export const getAll = async () =>{
    const boards = await Board.find()

    return boards.map(Board.toResponse)
}

export const getById = async (id: string) => {
    const board = await Board.findById(id)

    return Board.toResponse(board)
}

export const create = async (boardData: BoardData) => {
    const board = await Board.create(boardData)

    return Board.toResponse(board)
}

export const update = async (id: string, boardData: Partial<BoardData>) => {
    const board = await Board.findByIdAndUpdate(id, boardData)

    return Board.toResponse(board)
}

export const remove = async (id: string) => {
    const board = await Board.findByIdAndDelete(id)

    return Board.toResponse(board)
}
