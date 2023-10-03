import Item from "./item.js"

async function insertDefaultItems() {
    const exampleItem1 = Item.build({
        title: "Welcome to ToDoList 1",
        description: "Here you can add your todo tasks."
    })

    const exampleItem2 = Item.build({
        title: "Welcome to ToDoList 2",
        description: "And mark them as done.",
        isDone: true,
    })

    await exampleItem1.save()
    await exampleItem2.save()
}

async function getItems() {
    return await Item.findAll()
}

async function createItem(title, description) {
    const item = await Item.build({
        title: title,
        description: description
    })
    await item.save()
}

async function updateItem(itemId, title, description, isDone) {
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

async function deleteItem(itemId) {
    await Item.destroy({
        where: {
            id: itemId
        }
    })
}

export { insertDefaultItems, getItems, createItem, updateItem, deleteItem }