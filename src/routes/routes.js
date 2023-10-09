import ItemDAO from '../models/item/itemDAO.js'
import UserDAO from '../models/user/userDAO.js'
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
        const user = await UserDAO.findByEmail(req.body.email)

        if (user) {
            res.status(409).send('User with such email already exist')
            return
        }

        const newUser = await UserDAO.createNew(req.body.name, req.body.email, req.body.password)
        
        req.login(newUser, async function (err) {
            if (err) {
                console.log(err)
            }

            await ItemDAO.insertDefaultItems(newUser.id)

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