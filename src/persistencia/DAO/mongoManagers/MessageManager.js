import { messagesModel } from "../../mongodb/models/messages.model.js";

export default class MessageManager {
    async  addMessage (message) {
        try {
            const newMessage = await messagesModel.create(message) 
            return newMessage
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getMessages () {
        try {
            const messages = await messagesModel.find().lean()
            return messages
        } catch (error) {
            console.log(error)
            return error
        }
    }

}