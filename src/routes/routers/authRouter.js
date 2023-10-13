import ItemDAO from '../../models/item/itemDAO.js'
import UserDAO from '../../models/user/userDAO.js'
import UserProfileDAO from '../../models/user-profile/user-profileDAO.js'

export default function (app, passport) {
    const authAutoRedirectRoutes = ['/login', '/register']
    const authStatusCheck = (req, res, next) => {
        const requestedPath = req.path
        if (authAutoRedirectRoutes.some(route => requestedPath.includes(route)) && req.user) {
            res.redirect('/')
        } else {
            next()
        }
    }
    app.use(authStatusCheck)

    const authRequiredRoutes = ['/', '/profile']
    const authRequireCheck = (req, res, next) => {
        if (authRequiredRoutes.includes(req.path)) {
            if (req.user) {
                next()
            } else {
                res.redirect('/login')
            }
        } else {
            next()
        }
    }
    app.use(authRequireCheck)

    app.get('/login', (req, res) => {
        res.render('auth/login')
    })

    app.get('/register', (req, res) => {
        res.render('auth/register')
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

        await UserProfileDAO.createNew(newUser.id)

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
}