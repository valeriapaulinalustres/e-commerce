import { Router } from "express";
const router = Router()
import CartManager from "../CartManager.js";


const cartManager = new CartManager()


router.post('/', async (req, res) => {
    const cart = req.body
    //console.log(cart)
const addedCart = await cartManager.addCart(cart)
res.json({mensaje: "Carrito agregado", carrito: addedCart })
})

export default router