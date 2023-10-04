import 'dotenv/config.js'

import { Sequelize } from "sequelize"

const sequelize = new Sequelize({
    host: process.env.HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: false
})

async function syncDB() {
    try {
        await sequelize.sync({ alter: true })
        console.log('Connected to database')
    } catch (error) {
        console.error(`Error: Cannot connect to database ${error}`)
    }
}

export default sequelize
export { syncDB }