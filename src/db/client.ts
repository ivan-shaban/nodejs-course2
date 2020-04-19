import { connect, connection } from 'mongoose'

import { MONGO_CONNECTION_STRING } from '../common/config'
// uncomment below to get test data
// import { User } from '../resources/users/user.model'
//
// const addMockData = async () => {
//     const usersPromises = []
//     for (let i = 0; i < 10; i++) {
//         usersPromises.push(User.create({
//             name: `USER-${i}`,
//             login: `USER-${i}`,
//             password: 'test',
//         }))
//     }
//     await Promise.all(usersPromises)
// }

export const initializeMongoDB = (callback: Function) => {
    connection.on('error', console.error.bind(console, 'connection error:'))
    // eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/require-await
    connection.once('open', async () => {
        console.log('>> Connected to DB successful!')

        // initial cleanup
        await connection.dropDatabase()
        // await addMockData()

        callback()
    })

    connect(MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
}
