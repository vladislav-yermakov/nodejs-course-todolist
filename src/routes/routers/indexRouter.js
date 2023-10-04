import express from 'express'
import { getItems } from '../../models/itemDAO.js'

const indexRouter = express.Router()

indexRouter.get('/', async (req, res) => {
    const items = await getItems()
    res.render("index", { listItems: items })
})

export default indexRouter