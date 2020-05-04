import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Response,
    Route,
    Security,
    Tags,
} from 'tsoa'
import { inject } from 'inversify'

import { BoardsService } from './service'
import { BoardData } from './model'

@Route('boards')
@Tags('Boards')
@Security('jwt')
@Response('401', 'You need to authorized to work with that method')
export class BoardsController extends Controller {
    @inject(BoardsService)
    private readonly boardsService!: BoardsService

    /**
     * Returns all boards
     */
    @Get()
    getAllBoards() {
        return this.boardsService.getAllBoards()
    }

    /**
     * Creates a new board
     */
    @Post()
    createBoard(@Body() data: BoardData) {
        return this.boardsService.createBoard(data)
    }

    /**
     * Gets the Board by ID (e.g. “/boards/123”)
     */
    @Get('{id}')
    @Response('404', 'NotFound')
    getBoardById(id: string) {
        return this.boardsService.getBoardById(id)
    }

    /**
     * Updates a Board by ID
     */
    @Put('{id}')
    @Response('404', 'NotFound')
    updateBoard(id: string, @Body() data: BoardData) {
        return this.boardsService.updateBoard(id, data)
    }

    /**
     * Deletes a Board by ID.
     *
     * When somebody DELETE Board,
     * all its Tasks should be deleted as well
     */
    @Delete('{id}')
    @Response('404', 'NotFound')
    deleteBoard(id: string) {
        return this.boardsService.deleteBoard(id)
    }
}
