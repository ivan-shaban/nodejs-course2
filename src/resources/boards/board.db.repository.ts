import {
    Board,
    BoardData,
} from './board.model'

export const getAll = async () =>{
    const boards = await Board.find()

    return boards.map(Board.toDTO)
}

export const getById = async (id: string) => {
    const board = await Board.findById(id)

    return Board.toDTO(board)
}

export const create = async (boardData: BoardData) => {
    const board = await Board.create(boardData)

    return Board.toDTO(board)
}

export const update = async (id: string, boardData: Partial<BoardData>) => {
    const board = await Board.findByIdAndUpdate(id, boardData)

    return Board.toDTO(board)
}

export const remove = async (id: string) => {
    const board = await Board.findByIdAndDelete(id)

    return Board.toDTO(board)
}
