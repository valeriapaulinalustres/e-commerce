import { Router } from "express";
const router = Router()
//import CartManager from "../dao/fileManagers/CartManager.js";
import CartManager from "../dao/mongoManagers/CartManager.js";

const cartManager = new CartManager()


router.post('/', async (req, res) => {
    const cart = req.body
    const addedCart = await cartManager.addCart(cart)
    res.json({ mensaje: "Carrito agregado", carrito: addedCart })
})

router.get('/', async (req,res)=>{
    const carts = await cartManager.getCarts()
    res.json({mensaje: 'carritos encontrados', carritos: carts})
})

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    const cartFoundById = await cartManager.getCartById(cid)
    //res.json({ mensaje: "Carrito encontrado por id", carrito: cartFoundById })
    let cart = cartFoundById.cart
    res.render('cart', {cart})
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const addedProduct = await cartManager.addProductToCart(cid, pid)
    res.json({ mensaje: `Producto agregado a carrito ${cid}`, carrito: addedProduct })
})

router.delete('/:cid/product/:pid', async (req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const deletedProduct = await cartManager.deleteProductFromCart(cid, pid)
    res.json({ mensaje: `Producto eliminado del carrito ${cid}`, carrito: deletedProduct })
  
})

router.delete('/:cid', async(req,res)=>{
    const cid = req.params.cid
    const emptyCart = await cartManager.emptyCart(cid)
    res.json({ mensaje: `Carrito ${cid} vaciado` })
})

router.put('/:cid/product/:pid', async (req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body.quantity
    //console.log('aca',quantity)
    const editedProductQty = await cartManager.editProductQty(cid,pid,quantity)
    res.json({mensaje: `Producto editado: ${editedProductQty}`})
})

router.put('/:cid', async(req,res)=>{
    const cid = req.params.cid
    const newCart = req.body.cart
    console.log(newCart)
    const editedCart = await cartManager.editCart(cid, newCart)
    res.json({mensaje: `Carrito editado: ${editedCart}`})
})

export default router