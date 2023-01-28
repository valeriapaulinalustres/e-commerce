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

router.get('/:cid', async (req,res) =>{
    const cid = parseInt(req.params.cid)
   const cartFoundById = await cartManager.getCartById(cid)
   res.json({mensaje: "Carrito encontrado por id", carrito: cartFoundById})
})

export default router