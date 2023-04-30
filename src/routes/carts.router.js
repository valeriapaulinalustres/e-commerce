import { Router } from "express";
import {
  addCartController,
  editCartController,
  editProductQtyController,
  emptyCartController,
  getCartByIdController,
  getCartsController,
  addProductToCartController,
  deleteProductFromCartController,
  completeSaleController
} from "../controllers/carts.controller.js";
import { verificarUsuarioClient } from "../middlewares/auth.js";

const router = Router();



//const cartManager = new CartManager()

router.post(
  "/",
  addCartController
  // async (req, res) => {
  //     const cart = req.body
  //     const addedCart = await cartManager.addCart(cart)
  //     res.json({ mensaje: "Carrito agregado", carrito: addedCart })
  // }
);

router.get(
  "/",
  getCartsController
  // async (req,res)=>{
  //     const carts = await cartManager.getCarts()
  //     res.json({mensaje: 'carritos encontrados', carritos: carts})
  // }
);

router.get(
  "/:cid",
  getCartByIdController
  // async (req, res) => {
  //     const cid = req.params.cid
  //     const cartFoundById = await cartManager.getCartById(cid)
  //     //res.json({ mensaje: "Carrito encontrado por id", carrito: cartFoundById })
  //     let cart = cartFoundById.cart
  //     res.render('cart', {cart})
  // }
);

router.post(
  "/:cid/product/:pid", //verificarUsuarioClient,
  addProductToCartController
  // async (req, res) => {
  //     const cid = req.params.cid
  //     const pid = req.params.pid
  //     const addedProduct = await cartManager.addProductToCart(cid, pid)
  //     res.json({ mensaje: `Producto agregado a carrito ${cid}`, carrito: addedProduct })
  // }
);

router.delete(
  "/:cid/product/:pid",
  deleteProductFromCartController
  // async (req,res)=>{
  //     const cid = req.params.cid
  //     const pid = req.params.pid
  //     const deletedProduct = await cartManager.deleteProductFromCart(cid, pid)
  //     res.json({ mensaje: `Producto eliminado del carrito ${cid}`, carrito: deletedProduct })

  // }
);

router.delete(
  "/:cid",
  emptyCartController
  // async(req,res)=>{
  //     const cid = req.params.cid
  //     const emptyCart = await cartManager.emptyCart(cid)
  //     res.json({ mensaje: `Carrito ${cid} vaciado` })
  // }
);

router.put(
  "/:cid/product/:pid/:qty",
  editProductQtyController
  // async (req,res)=>{
  //     const cid = req.params.cid
  //     const pid = req.params.pid
  //     const quantity = req.body.quantity
  //     //console.log('aca',quantity)
  //     const editedProductQty = await cartManager.editProductQty(cid,pid,quantity)
  //     res.json({mensaje: `Producto editado: ${editedProductQty}`})
  // }
);

router.put(
  "/:cid",
  editCartController
  // async(req,res)=>{
  //     const cid = req.params.cid
  //     const newCart = req.body.cart
  //     console.log(newCart)
  //     const editedCart = await cartManager.editCart(cid, newCart)
  //     res.json({mensaje: `Carrito editado: ${editedCart}`})
  // }
);

router.post('/:cid/purchase', completeSaleController

)

export default router;
