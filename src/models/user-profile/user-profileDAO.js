import UserProfile from "./user-profile.js"

class UserProfileDAO {
    static async findByUserId(userId) {
        return await UserProfile.findOne({ where: { userId: userId }})
    }

    static async createNew(userId) {
        const newUserProfile = UserProfile.build({
            userId: userId
        })
        await newUserProfile.save()
        return newUserProfile
    }

    static async update(userId, avatar, birthdate, address, info) {
        await UserProfile.update(
            {
                avatar: avatar,
                birthdate: birthdate,
                address: address,
                info: info
            },
            {
                where: { userId: userId }
            }
        )
    }
}

export default UserProfileDAO