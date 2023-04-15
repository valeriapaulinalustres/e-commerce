import {
    createUser,
    loginUser
} from '../persistencia/usersPersistence.js'


export async function createUserService(user){
    const newUser = await createUser(user)
    return newUser
}

export async function loginUserService(user){
    const newUser = await loginUser(user)
    return newUser
}