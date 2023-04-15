import {addMessage, getMessages} from '../persistencia/messagesPersistence.js'

export async function addMessageService(message){
    const newMessage = await addMessage(message)
    return newMessage
}

export async function getMessagesService(){
    const messages = await getMessages()
    return messages
}
