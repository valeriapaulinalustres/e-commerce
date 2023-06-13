
import MongoDb from './DAO/mongoManagers/UsersManager.js'
import {userModel} from './mongodb/models/user.model.js'


let persistence = new MongoDb('Products', userModel)


export async function getUsers() {
    return await persistence.getUsers()
}

export async function createUser(user) {
    return await persistence.createUser(user)
}

export async function loginUser(user) {
    return await persistence.loginUser(user)
}

// export async function getUsersData(userFromSession) {
//     return await persistence.getUsersData(userFromSession)
// }

export async function getUserDataFromMail(email){
    return await persistence.getUserDataFromMail(email)
}

export async function forgotPassword(mail) {
    return await persistence.forgotPassword(mail)
}

export async function createNewPassword (password, userId, token) {
    return await persistence.createNewPassword(password, userId, token)
}

export async function changeRol (userId) {
    return await persistence.changeRol(userId)
}

export async function addCartToUser(uid, cid) {
    return await persistence.addCartToUser(uid,cid)
}

export async function uploadFiles(uid, docs) {
    return await persistence.uploadFiles(uid,docs)
}

export async function login(user, time) {
    return await persistence.login(user, time)
}

export async function logout(user, time) {
    return await persistence.logout(user, time)
}

export async function deleteUsers(user, time) {
    return await persistence.deleteUsers(user, time)
}

