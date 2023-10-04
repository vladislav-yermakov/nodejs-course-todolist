import User from "./postgre/user.js"

class UserDAO {
    static async findById(id) {
        return await User.findByPk(id)
    }

    static async findByEmail(email) {
        return await User.findOne({ where: { email: email } })
    }

    static async createNew(email, password) {
        const newUser = User.build({
            email: email,
            password: password
        })
        await newUser.save()

        return newUser
    }
}

export default UserDAO