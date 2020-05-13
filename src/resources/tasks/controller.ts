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

import { TasksService } from './service'
import { TaskData } from './model'

@Route('boards')
@Tags('Tasks')
@Security('jwt')
@Response('401', 'You need to be authorized to work with that method')
export class TasksController extends Controller {
    @inject(TasksService)
    private readonly tasksService!: TasksService

    /**
     * Gets tasks by the Board ID
     * (e.g. “/board/1/tasks”)
     */
    @Get('{boardId}/tasks')
    getAllTasks(boardId: string) {
        return this.tasksService.getAllTasks(boardId)
    }

    /**
     * Creates a new task
     */
    @Post('{boardId}/tasks')
    createTask(boardId: string, @Body() data: TaskData) {
        return this.tasksService.createTask(boardId, data)
    }

    /**
     * Gets the Task by the Board's and task ID
     * (e.g. “/board/1/tasks/123”)
     */
    @Get('{boardId}/tasks/{id}')
    @Response('404', 'NotFound')
    getTaskById(boardId: string, id: string) {
        return this.tasksService.getTaskById(boardId, id)
    }

    /**
     * Updates the Task by ID
     */
    @Put('{boardId}/tasks/{id}')
    @Response('404', 'NotFound')
    updateTask(boardId: string, id: string, @Body() data: TaskData) {
        return this.tasksService.updateTask(boardId, id, data)
    }

    /**
     * Deletes Task by ID.
     */
    @Delete('{boardId}/tasks/{id}')
    @Response('404', 'NotFound')
    deleteTaskById(boardId: string, id: string) {
        return this.tasksService.deleteTaskById(boardId, id)
    }
}
