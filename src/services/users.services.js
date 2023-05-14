import {
    createUser,
    loginUser,
   // getUsersData,
   forgotPassword,
   createNewPassword,
   changeRol
} from '../persistencia/usersPersistence.js'
import UsersRepository from '../persistencia/repositories/users.repositories.js'


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

