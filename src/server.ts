import { PORT } from './common/config'
import { app } from './app'
import { initializeMongoDB } from './db/client'

initializeMongoDB(() => {
    app.listen(PORT, () =>
        console.log(`App is running on http://localhost:${PORT}`),
    )
})
