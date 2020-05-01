import {
    Container,
    decorate,
    injectable,
} from 'inversify'
import { Controller } from 'tsoa'

import { UsersService } from '../resources/users/service'
import { UsersController } from '../resources/users/controller'
import { TasksService } from '../resources/tasks/service'
import { TasksController } from '../resources/tasks/controller'
import { LoginService } from '../resources/login/service'
import { LoginController } from '../resources/login/controller'
import { BoardsService } from '../resources/boards/service'
import { BoardsController } from '../resources/boards/controller'

export const iocContainer = new Container()
iocContainer.bind(UsersService).toSelf().inSingletonScope()
iocContainer.bind(UsersController).toSelf().inSingletonScope()
iocContainer.bind(TasksService).toSelf().inSingletonScope()
iocContainer.bind(TasksController).toSelf().inSingletonScope()
iocContainer.bind(LoginService).toSelf().inSingletonScope()
iocContainer.bind(LoginController).toSelf().inSingletonScope()
iocContainer.bind(BoardsService).toSelf().inSingletonScope()
iocContainer.bind(BoardsController).toSelf().inSingletonScope()

decorate(injectable(), Controller)
