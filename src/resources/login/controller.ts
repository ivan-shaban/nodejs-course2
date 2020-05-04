import {
    Body,
    Controller,
    Example,
    Post,
    Response,
    Route,
    Tags,
} from 'tsoa'
import { inject } from 'inversify'

import { UsersService } from '../users/service'

import { LoginService } from './service'

export interface LoginBody {
    readonly login: string;
    readonly password: string;
}

@Route('login')
@Tags('Login')
export class LoginController extends Controller {
    @inject(LoginService)
    private readonly loginService!: LoginService

    @inject(UsersService)
    private readonly usersService!: UsersService

    /**
     * Login a user and returns a JWT-token
     */
    @Example<LoginBody>({
        login: 'admin',
        password: 'admin',
    })
    @Response('403', 'Forbidden, login or password incorrect')
    @Post()
    async login(@Body() data: LoginBody) {
        const { id } = await this.usersService.getUserByCredentials(data.login, data.password)
        const token = this.loginService.createJWT(id, data.login)

        return { token }
    }
}
