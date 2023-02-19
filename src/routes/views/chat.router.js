import { Router } from "express";
const router = Router()
import MessageManager from '../../dao/mongoManagers/MessageManager.js'

const messageManager = new MessageManager()

router.get('/', async (req, res) => {
    let chat = await messageManager.getMessages()
   res.render('chat',{chat}) 
})

export default router