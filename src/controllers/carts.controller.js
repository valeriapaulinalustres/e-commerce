import {
  addCartService,
  getCartsService,
  getCartByIdService,
  addProductToCartService,
  deleteProductFromCartService,
  emptyCartService,
  editProductQtyService,
  editCartService,
  completeSaleService,
  eraseProductFromCartService
} from "../services/carts.services.js";
import logger from "../utils/winston.js";

export const addCartController = async (req, res) => {
  try {
    const cart = req.body;
    const addedCart = await addCartService(cart);
    res.json({ message: addedCart });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const getCartsController = async (req, res) => {
  try {
    const carts = await getCartsService();
    res.json({ message: carts });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const getCartByIdController = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cartFoundById = await getCartByIdService(cid);

    res.json({ message: cartFoundById});
    //   res.render('cart', {cart})
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const addProductToCartController = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const owner = req.body.user;
    const addedProduct = await addProductToCartService(cid, pid, owner);
    res.json({
      message: 'Product added successfully',
      product: addedProduct,
      status: 'success'
    });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const deleteProductFromCartController = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const deletedProduct = await deleteProductFromCartService(cid, pid);
    res.json({
      message: deletedProduct,
    });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const emptyCartController = async (req, res) => {
  try {
    const cid = req.params.cid;
    const emptyCart = await emptyCartService(cid);
    res.json({ message: 'Cart emptied successfully', cart: emptyCart, status: 'success' });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const editProductQtyController = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = parseInt(req.params.qty);
    const editedProductQty = await editProductQtyService(cid, pid, quantity);
    res.json({ message: editedProductQty });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const editCartController = async (req, res) => {
  try {
    const cid = req.params.cid;
    const newCart = req.body.cart;
    const editedCart = await editCartService(cid, newCart);
    res.json({ message: editedCart });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};

export const completeSaleController = async (req, res) => {
  try {
    const buyer = req.user;
    const cid = req.params.cid;
    const resultCart = await completeSaleService(cid, buyer.full_name);
    // algo.ticket = {...algo.ticket, purchaser: req.cookies.user.user.email}

    res.json({ message: resultCart });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};


export const eraseProductFromCartController = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const deletedProduct = await eraseProductFromCartService(cid, pid);
    res.json({
      message: deletedProduct,
    });
  } catch (error) {
    logger.error('Error del controller', error)
  }
};