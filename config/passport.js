import LocalStrategy from "passport-local"
import User from "../src/models/user.js"
import passport from "passport"

passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            const user = await User.findOne({ where: { email: username } })

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
    User
        .findByPk(id)
        .then(function (user) {
            done(null, user)
        })
})