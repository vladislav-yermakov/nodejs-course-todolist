import { DataTypes, Sequelize } from "sequelize"

import sequelize from '../../config/db.js'

const Item = sequelize.define("Item", {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	title: DataTypes.TEXT,
	description: DataTypes.TEXT,
	isDone: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
})

export default Item
