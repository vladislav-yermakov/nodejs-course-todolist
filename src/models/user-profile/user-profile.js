import { DataTypes } from "sequelize"
import sequelize from "../../../config/db.js"

const UserProfile = sequelize.define(
    'user-profile',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        info: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        timestamps: false
    }
)

export default UserProfile