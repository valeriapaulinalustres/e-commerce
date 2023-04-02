import {
    addMessageService, 
    getMessagesService
} from '../services/messages.services.js'

export const getMessagesController = async (req, res) => {
    let chat = await getMessagesService()
   res.render('chat',{chat}) 
}