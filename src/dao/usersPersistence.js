
import MongoDb from './mongodb/mongoManagers/UsersManager.js'
import {usersSchema} from './mongodb/models/user.model.js'


let persistence = new MongoDb('Products', usersSchema)

export async function createUser(user) {
    return await persistence.createUser(user)
}

export async function loginUser(user) {
    return await persistence.loginUser(user)
}
