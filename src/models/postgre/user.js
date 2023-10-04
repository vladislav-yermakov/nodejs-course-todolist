import { DataTypes } from "sequelize"
import sequelize from "../../../config/db.js"
import Item from "./item.js"

const User = sequelize.define(
    'User',
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
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    { 
        timestamps: false
    }
)

// https://stackoverflow.com/questions/66301876
User.prototype.verifyPassword = function(password) {
    return this.password === password
}

User.hasMany(Item, {
    foreignKey: 'userId'
})
Item.belongsTo(User, {
    foreignKey: 'userId'
})

export default User