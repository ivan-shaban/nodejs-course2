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

import { UsersService } from './service'
import { UserData } from './user.model'

@Route('users')
@Tags('Users')
@Security('jwt')
@Response('401', 'Unathorized')
export class UsersController extends Controller {
    @inject(UsersService)
    private readonly usersService!: UsersService

    /**
     * Gets all users (remove password from response)
     */
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers()
    }

    /**
     * Creates a new user (remove password from response)
     */
    @Post()
    createUser(@Body() data: UserData) {
        return this.usersService.createUser(data)
    }

    /**
     * Gets a user by ID
     *
     * e.g. “/users/123” (remove password from response)
     */
    @Get('{id}')
    getUserById(id: string) {
        return this.usersService.getUserById(id)
    }

    /**
     * Updates a user by ID
     */
    @Put('{id}')
    updateUser(id: string, @Body() data: UserData) {
        return this.usersService.updateUser(id, data)
    }

    /**
     * Deletes user by ID.
     *
     * When somebody DELETE User, all Tasks where User is assignee should be
     * updated to put userId=null
     */
    @Delete('{id}')
    deleteUser(id: string) {
        return this.usersService.deleteUser(id)
    }
}
