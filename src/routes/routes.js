import indexRouter from './routers/indexRouter.js'
import itemRouter from './routers/itemRouter.js'

export default function (app, passport) {

    app.get('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }))

    app.get('/logout', (req, res) => {
        req.logout((err) => {
            if (err) { return next(err) }
            res.redirect('/login')
        })
    })

    const isAuthenticated = (req, res, next) => {
        if (req.user) {
            return next()
        } else {
            return res.status(401).json({
                error: 'Unauthorised'
            })
        }
    }
    app.use(isAuthenticated)

    app.use('/', indexRouter)
    app.use('/item', itemRouter)
}