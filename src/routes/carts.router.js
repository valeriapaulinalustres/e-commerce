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
  completeSaleController,
  eraseProductFromCartController,
} from "../controllers/carts.controller.js";
import { verificarUsuarioClient } from "../middlewares/auth.js";

const router = Router();

//const cartManager = new CartManager()  -- Lo comentado queda de ejemplo para hacer rutas sin capas

// --- Crea un carrito para un usuario ---
router.post("/", addCartController
  // async (req, res) => {
  //     const cart = req.body
  //     const addedCart = await cartManager.addCart(cart)
  //     res.json({ mensaje: "Carrito agregado", carrito: addedCart })
  // }
);

// --- Trae carritos ---
router.get("/", getCartsController);

// --- Trae un carrito por id ---
router.get("/:cid", getCartByIdController);

// --- Agrega producto al carrito ---
router.post("/:cid/product/:pid", verificarUsuarioClient, addProductToCartController);

// --- Borra una unidad de un producto del carrito ---
router.delete("/:cid/product/:pid", deleteProductFromCartController);

// --- Elimina el carrito ---
router.delete("/:cid", emptyCartController);

// --- Edita cantidad de productos de un carrito
router.put("/:cid/product/:pid/:qty", editProductQtyController);

// --- Edita carrito ---
router.put("/:cid", editCartController);

// --- Elimina un producto del carrito ---
router.delete("/:cid/product/:pid/erase", eraseProductFromCartController);

// --- Completa la compra ---
router.post("/:cid/purchase", completeSaleController);

export default router;
