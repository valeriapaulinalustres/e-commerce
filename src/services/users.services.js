import {
    createUser,
    loginUser,
   // getUsersData,
   forgotPassword,
   createNewPassword,
   changeRol,
   getUserDataFromMail,
   addCartToUser,
   uploadFiles,
   login,
   logout,
   getUsers,
   deleteUsers,
   deleteUser,
   changeRolByAdmin
} from '../persistencia/usersPersistence.js'
import UsersRepository from '../persistencia/repositories/users.repositories.js'
import UsersRespDTO from '../persistencia/DTO/usersResp.dto.js'



export async function getUsersService(){
    const users = await getUsers()
    let usersToSend = []

    for (let i = 0; i < users.length; i++) {
        const userToSend = new UsersRespDTO(users[i])
        usersToSend.push(userToSend)
    }
    return usersToSend
}

export async function createUserService(user){
    const newUser = await createUser(user)
    return newUser
}

export async function loginUserService(user){
    const newUser = await loginUser(user)
    return newUser
}

export async function getUsersDataService(userFromSession){
 //   const userFromDTO = new UsersRepository(user)
//acá da la vuelta, poner DTO
    //const usersData = await getUsersData(userFromSession)
    return userFromSession
}

export async function getUserDataFromMailService(email){
    const user = await getUserDataFromMail(email)
    return user

}

export async function forgotPasswordService(mail){
    const user = await forgotPassword(mail)
    return user
}

export async function createNewPasswordServices(password, userId, token){
    const user = await createNewPassword(password, userId, token)
    return user
}

export async function changeRolServices(userId){
    const user = await changeRol(userId)
    return user
}

export async function addCartToUserService(uid, cid) {
    const user = await addCartToUser(uid, cid)
    return user
}


export async function uploadFilesService(uid, docs) {
    const user = await uploadFiles(uid, docs)
    return user
}

export async function loginService(user, time) {
    const response = await login(user, time)
    return response
}


export async function logoutService(user, time) {
    const response = await logout(user, time)
    return response
}

export async function deleteUsersService() {
   
    const users = await deleteUsers()

    return users
}


export async function deleteUserService(email) {
   
    const response = await deleteUser(email)

    return response
}


export async function changeRolByAdminService(email, newRol) {
   
    const response = await changeRolByAdmin(email, newRol)

    return response
}