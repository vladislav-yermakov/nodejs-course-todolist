import express from 'express'
import ItemDAO from '../../models/item/itemDAO.js'
import UserDAO from '../../models/user/userDAO.js'
import UserProfileDAO from '../../models/user-profile/user-profileDAO.js'

const profileRouter = express.Router()

profileRouter.route('/')
    .get(async (req, res) => {
        const user = await UserDAO.findById(req.user.id)
        const userProfile = await UserProfileDAO.findByUserId(req.user.id)
        res.render('main/profile', { 
            name: user.name, 
            email: user.emailEnc,
            avatar: userProfile.avatar,
            birthdate: userProfile.birthdate,
            address: userProfile.address,
            info: userProfile.info
        })
    })
    .put(async (req, res) => {
        await UserProfileDAO.update(req.user.id, null, req.body.birthdate, req.body.address, req.body.info)
        res.sendStatus(200)
    })

export default profileRouter