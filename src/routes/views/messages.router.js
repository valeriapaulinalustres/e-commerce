import { Router } from "express";
const router = Router()
import MessageManager from '../../persistencia/DAO/mongoManagers/MessageManager.js'
import { verificarUsuarioClient } from "../../middlewares/auth.js";

const messageManager = new MessageManager()

router.get('/', verificarUsuarioClient,  async (req, res) => {
    let chat = await messageManager.getMessages()
   res.render('chat',{chat}) 
})

export default router