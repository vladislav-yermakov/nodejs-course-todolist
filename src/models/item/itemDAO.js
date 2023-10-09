import Item from "./item.js"

class ItemDAO {
    static async insertDefaultItems(userId) {
        const defaultItem1 = Item.build({
            title: "Welcome to ToDoList Tip: 1",
            description: "Here you can add your todo tasks.",
            userId: userId
        })

        const defaultItem2 = Item.build({
            title: "Welcome to ToDoList Tip: 2",
            description: "And mark them as done.",
            isDone: true,
            userId: userId
        })

        await defaultItem1.save()
        await defaultItem2.save()
    }

    static async getItems(userId) {
        return await Item.findAll({ where: { userId: userId } })
    }

    static async createItem(userId, title, description) {
        const item = Item.build({
            title: title,
            description: description,
            userId: userId
        })
        await item.save()
    }

    static async updateItem(itemId, title, description, isDone) {
        await Item
            .update(
                {
                    title: title,
                    description: description,
                    isDone: isDone
                },
                {
                    where: { id: itemId }
                }
            )
    }

    static async deleteItem(itemId) {
        await Item.destroy({
            where: {
                id: itemId
            }
        })
    }
}

export default ItemDAO