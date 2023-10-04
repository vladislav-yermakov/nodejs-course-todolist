import User from '../models/user.js'
import indexRouter from './routers/indexRouter.js'
import itemRouter from './routers/itemRouter.js'

export default function (app, passport) {
    app.get('/login', (req, res) => {
        res.render('login')
    })
    
    app.get('/register', (req, res) => {
        res.render('register')
    })

    app.get('/auth/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }))

    app.post('/auth/register', async (req, res) => {
        const user = await User.findOne({ where: { email: req.body.email } })

        if (user) {
            res.sendStatus(409).send('User with such email already exist')
            return
        }

        const newUser = User.build({
            email: req.body.email, 
            password: req.body.password
        })
        await newUser.save()
        
        req.login(newUser, function (err) {
            if (err) {
                console.log(err)
            }

            return res.redirect('/')
        })
    })

    app.get('/auth/logout', (req, res) => {
        req.logout((err) => {
            if (err) { return next(err) }
            res.redirect('/login')
        })
    })

    const isAuthenticated = (req, res, next) => {
        if (req.user) {
            return next()
        } else {
            res.redirect('/login')
        }
    }
    app.use(isAuthenticated)

    app.use('/', indexRouter)
    app.use('/item', itemRouter)
}