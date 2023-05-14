
import MongoDb from './DAO/mongoManagers/UsersManager.js'
import {userModel} from './mongodb/models/user.model.js'


let persistence = new MongoDb('Products', userModel)

export async function createUser(user) {
    return await persistence.createUser(user)
}

export async function loginUser(user) {
    return await persistence.loginUser(user)
}

// export async function getUsersData(userFromSession) {
//     return await persistence.getUsersData(userFromSession)
// }

export async function forgotPassword(mail) {
    return await persistence.forgotPassword(mail)
}

export async function createNewPassword (password, userId, token) {
    return await persistence.createNewPassword(password, userId, token)
}

export async function changeRol (userId) {
    return await persistence.changeRol(userId)
}