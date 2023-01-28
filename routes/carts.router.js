import { Router } from "express";
const router = Router()
import CartManager from "../CartManager.js";


const cartManager = new CartManager()


router.post('/', async (req, res) => {
    const cart = req.body
    const addedCart = await cartManager.addCart(cart)
    res.json({ mensaje: "Carrito agregado", carrito: addedCart })
})

router.get('/:cid', async (req, res) => {
    const cid = parseInt(req.params.cid)
    const cartFoundById = await cartManager.getCartById(cid)
    res.json({ mensaje: "Carrito encontrado por id", carrito: cartFoundById })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const addedProduct = await cartManager.addProductToCart(cid, pid)
    res.json({ mensaje: `Producto agregado a carrito ${cid}`, carrito: addedProduct })
})

export default router