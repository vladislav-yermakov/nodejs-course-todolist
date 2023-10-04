import LocalStrategy from "passport-local"
import passport from "passport"
import UserDAO from "../src/models/userDAO.js"


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async function (email, password, done) {
        try {
            const user = await UserDAO.findByEmail(email)

            if (!user) {
                return done(null, false, { message: 'Invalid credentials' })
            }

            const passVal = user.verifyPassword(password)
            if (!passVal) {
                return done(null, false, { message: 'Invalid credentials' })
            }

            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    UserDAO
        .findById(id)
        .then(function (user) {
            done(null, user)
        })
})