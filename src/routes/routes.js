
import indexRouter from './routers/indexRouter.js'
import itemRouter from './routers/itemRouter.js'
import profileRouter from './routers/profileRouter.js'
import { default as authRouter } from './routers/authRouter.js'

export default function (app, passport) {
    
    authRouter(app, passport)

    app.use('/', indexRouter)
    app.use('/item', itemRouter)
    app.use('/profile', profileRouter)

    // Handle undefined routes
    app.get('*', (req, res) => {
        res.status(404).render('not-found')
    })
}