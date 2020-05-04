import {
    Board,
    BoardData,
    BoardModel,
} from './model'

export const getAll = async () =>{
    const boards = await BoardModel.find()

    return boards.map(Board.toDTO)
}

export const getById = async (id: string) => {
    const board = await BoardModel.findById(id)

    return board && Board.toDTO(board)
}

export const create = async (boardData: BoardData) => {
    const board = await BoardModel.create(boardData)

    return Board.toDTO(board)
}

export const update = async (id: string, boardData: Partial<BoardData>) => {
    const board = await BoardModel.findByIdAndUpdate(id, boardData)

    return board && Board.toDTO(board)
}

export const remove = async (id: string) => {
    const board = await BoardModel.findByIdAndDelete(id)

    return board && Board.toDTO(board)
}
