export interface UserData {
    readonly name: string;
    readonly login: string;
    readonly password: string;
}

export class User implements UserData {
    private static counter = 1

    public id: string
    public name: string
    public login: string
    public password: string

    constructor(id: string, data: UserData = {
        name: `USER-${User.counter++}`,
        login: 'user',
        password: 'P@55w0rd',
    }) {
        this.id = id
        this.name = data.name
        this.login = data.login
        this.password = data.password
    }

    public update = (data: Partial<UserData>) => {
        for (const prop in data) {
            // @ts-ignore
            this[prop] = data[prop]
        }
    }

    /**
     * Transform model by removing secret props, e.g. password
     * @param user
     */
    public static toResponse = (user: User) => {
        const { id, name, login } = user
        return {
            id,
            name,
            login,
        }
    }
}
