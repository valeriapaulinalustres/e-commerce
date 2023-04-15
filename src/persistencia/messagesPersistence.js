
import MongoDb from './DAO/mongoManagers/MessageManager.js'
import {messagesSchema} from './mongodb/models/messages.model.js'


let persistence = new MongoDb('Messages', messagesSchema)

export async function addMessage(message) {
    return await persistence.addMessage(message)
}

export async function getMessages(messages) {
    return await persistence.getMessages(messages)
}