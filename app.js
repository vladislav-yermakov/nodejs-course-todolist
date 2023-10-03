import 'dotenv/config.js'
import './config/passport.js'

import bodyParser from "body-parser"
import express from 'express'
import morgan from "morgan"
import passport from 'passport'
import { default as routes } from './src/routes/routes.js'
import session from 'express-session'
import { syncDB } from './src/db/db.js'

const app = express()

// Logger
app.use(morgan('dev'))

// Views
app.set('view engine', 'ejs')
app.set('views', './src/views')

// Public Resources
app.use(express.static('public'))

// Request parameters parsers
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Authentication
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// Routes
routes(app, passport)

// Start
app.listen(process.env.PORT, async () => {
    console.log(`Listening on port ${process.env.PORT}`)
    syncDB()
})
