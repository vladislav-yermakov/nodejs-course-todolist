import express from 'express'
import ItemDAO from '../../models/item/itemDAO.js'
import UserDAO from '../../models/user/userDAO.js'

const indexRouter = express.Router()

indexRouter.get('/', async (req, res) => {
    const items = await ItemDAO.getItems(req.user.id)
    const user = await UserDAO.findById(req.user.id)
    res.render("main/index", { name: user.name, listItems: items })
})

export default indexRouter