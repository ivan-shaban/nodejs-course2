import {
    connect,
    connection,
} from 'mongoose'

import { MONGO_CONNECTION_STRING } from '../common/config'
import { UserModel } from '../resources/users/model'

const addMockData = async () => {
    await UserModel.create({
        name: 'admin',
        login: 'admin',
        password: 'admin',
    })
}

export const initializeMongoDB = (callback: Function) => {
    connection.on('error', console.error.bind(console, 'connection error:'))
    // eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/require-await
    connection.once('open', async () => {
        console.log('>> Connected to DB successful!')

        // initial cleanup
        await connection.dropDatabase()
        await addMockData()

        callback()
    })

    connect(MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
}
