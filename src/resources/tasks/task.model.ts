export interface TaskData {
    readonly   title: string;
    readonly   order: string;
    readonly   description: string;
    /**
     * assignee
     */
    readonly   userId: string | null;
    readonly   boardId: string;
    readonly   columnId: string;
}

export class Task implements TaskData {
    public id: string
    public title: string
    public order: string
    public description: string
    public userId: string | null
    public boardId: string
    public columnId: string

    constructor(id: string, data: TaskData) {
        this.id = id
        this.title = data.title
        this.order = data.order
        this.description = data.description
        this.userId = data.userId
        this.boardId = data.boardId
        this.columnId = data.columnId
    }

    public update = (data: Partial<TaskData>) => {
        for (const prop in data) {
            // @ts-ignore
            this[prop] = data[prop]
        }
    }

    public static toResponse = (taskData: TaskData) => {
        return taskData
    }
}
