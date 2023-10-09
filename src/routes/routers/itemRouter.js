import express from 'express'
import ItemDAO from '../../models/item/itemDAO.js'

const itemRouter = express.Router()

itemRouter.route('/')
    .post(async (req, res) => {
        await ItemDAO.createItem(req.user.id, req.body.title, req.body.description)
        res.redirect("/")
    })
    .put(async (req, res) => {
        await ItemDAO.updateItem(req.body.itemId, req.body.title, req.body.description, req.body.isDone)
        res.sendStatus(200)
    })
    .delete(async (req, res) => {
        await ItemDAO.deleteItem(req.body.itemId)
        res.sendStatus(200)
    })

export default itemRouter