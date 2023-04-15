import {
    createUser,
    loginUser,
    getUsersData
} from '../persistencia/usersPersistence.js'


export async function createUserService(user){
    const newUser = await createUser(user)
    return newUser
}

export async function loginUserService(user){
    const newUser = await loginUser(user)
    return newUser
}

export async function getUsersDataService(usersMail){
    const usersData = await getUsersData(usersMail)
    return usersData
}