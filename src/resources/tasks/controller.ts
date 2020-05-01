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
import { TaskData } from './task.model'

@Route('boards')
@Tags('Tasks')
@Security('jwt')
@Response('401', 'Unathorized')
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
    getTaskById(boardId: string, id: string) {
    // getTaskById(@Path('boardId') boardId: string, id: string) {
        return this.tasksService.getTaskById(boardId, id)
    }

    /**
     * Updates the Task by ID
     */
    @Put('{boardId}/tasks/{id}')
    updateTask(boardId: string, id: string, @Body() data: TaskData) {
        return this.tasksService.updateTask(boardId, id, data)
    }

    /**
     * Deletes Task by ID.
     */
    @Delete('{boardId}/tasks/{id}')
    deleteTaskById(boardId: string, id: string) {
        return this.tasksService.deleteTaskById(boardId, id)
    }
}
