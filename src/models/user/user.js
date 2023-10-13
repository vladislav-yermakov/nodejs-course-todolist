import bcrypt from 'bcrypt'
import { DataTypes } from "sequelize"
import sequelize from "../../../config/db.js"
import Item from "../item/item.js"
import { encrypt, decrypt, hash256 } from '../../../config/crypto.js'
import UserProfile from '../user-profile/user-profile.js'

const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        emailEnc: {
            type: DataTypes.STRING,
            unique: true
        },
        passwordSalt: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false
    }
)

// https://stackoverflow.com/questions/66301876
User.prototype.verifyPassword = async function (password) {
    const passHash = await bcrypt.hash(password, this.passwordSalt)
    const match = await bcrypt.compare(passHash, this.password)
    return match
}

User.hasMany(Item, { foreignKey: 'userId' })
Item.belongsTo(User, { foreignKey: 'userId' })

User.hasOne(UserProfile, { foreignKey: 'userId' })
UserProfile.belongsTo(User, { foreignKey: 'userId' })

User.addHook('beforeSave', async model => {
    const passSalt = await bcrypt.genSalt(3)
    const passHash = await bcrypt.hash(model.password, passSalt)
    model.passwordSalt = passSalt
    model.password = passHash

    const email = model.email
    const emailHash = hash256(email)
    model.email = emailHash
    model.emailEnc = encrypt(email)

    if (model.name) {
        model.name = encrypt(model.name)
    }
    
    return model
})

User.addHook('beforeFind', query => {
    if (query && query.where) {
        if (query.where.name) {
            query.where.name = encrypt(query.where.name)
        }

        const email = query.where.email
        if (query.where.email) {
            query.where.email = hash256(email)
        }
        if (query.where.emailEnc) {
            query.where.emailEnc = encrypt(email)
        }
    }
    return query
})

User.addHook('afterFind', query => {
    if (query && query.dataValues) {
        if (query.dataValues.name !== null) {
            query.dataValues.name = decrypt(query.dataValues.name)
        }
        query.dataValues.emailEnc = decrypt(query.dataValues.emailEnc)
    }
    return query
})

export default User