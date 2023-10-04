import express from 'express'
import ItemDAO from '../../models/itemDAO.js'

const indexRouter = express.Router()

indexRouter.get('/', async (req, res) => {
    const items = await ItemDAO.getItems(req.user.id)
    res.render("index", { listItems: items })
})

export default indexRouter