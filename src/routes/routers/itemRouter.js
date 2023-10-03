import { createItem, deleteItem, updateItem } from '../../models/itemDAO.js'

import express from 'express'

const itemRouter = express.Router()

itemRouter.route('/')
    .post(async (req, res) => {
        await createItem(req.body.title, req.body.description)
        res.redirect("/")
    })
    .put(async (req, res) => {
        await updateItem(req.body.itemId, req.body.title, req.body.description, req.body.isDone)
        res.sendStatus(200)
    })
    .delete(async (req, res) => {
        await deleteItem(req.body.itemId)
        res.sendStatus(200)
    })

export default itemRouter