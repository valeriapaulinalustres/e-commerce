import CustomError from "../../../utils/errors/CustomError.js";
import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../../../utils/errors/errorsEnum.js";
import { cartsModel } from "../../mongodb/models/carts.model.js";
import { productsModel } from "../../mongodb/models/products.model.js";
import { ticketsModel } from "../../mongodb/models/tickets.model.js";

export default class CartManager {
  async addCart(cart) {
    if (!cart) {
      CustomError.createCustomError({
        name: ErrorsName.CART_DATA_INCOMPLETE,
        cause: ErrorsCause.CART_DATA_INCOMPLETE,
        message: ErrorsMessage.CART_DATA_INCOMPLETE,
      });
    }
    let newCartFromUuser = { products: cart };
    try {
      const newCart = await cartsModel.create(newCartFromUuser);
      return newCart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getCarts() {
    try {
      const carts = await cartsModel.find().lean();
      return carts;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getCartById(cid) {
    if (!cid) {
      CustomError.createCustomError({
        name: ErrorsName.CART_DATA_INCOMPLETE,
        cause: ErrorsCause.CART_DATA_INCOMPLETE,
        message: ErrorsMessage.CART_DATA_INCOMPLETE,
      });
    }
    try {
      const cart = await cartsModel
        .findById(cid)
        .populate({ path: "products.id" })
        .lean();

      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async addProductToCart(cid, pid) {
    if (!cid || !pid) {
      CustomError.createCustomError({
        name: ErrorsName.CART_DATA_INCOMPLETE,
        cause: ErrorsCause.CART_DATA_INCOMPLETE,
        message: ErrorsMessage.CART_DATA_INCOMPLETE,
      });
    }
    try {
      const cart = await cartsModel.findOne({ _id: cid });

      if (!cart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
      }

      if (cart.products.findIndex((el) => el.id == pid) !== -1) {
        cart.products[
          cart.products.findIndex((el) => el.id == pid)
        ].quantity += 1;
      } else {
        //este funciona
        cart.products.push({ id: pid, quantity: 1 });
      }

      await cart.save();

      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteProductFromCart(cid, pid) {
    if (!cid || !pid) {
      CustomError.createCustomError({
        name: ErrorsName.CART_DATA_INCOMPLETE,
        cause: ErrorsCause.CART_DATA_INCOMPLETE,
        message: ErrorsMessage.CART_DATA_INCOMPLETE,
      });
    }
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
      }

      let productIndex = cart.products.findIndex((el) => el.id == pid);

      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1;
      } else {
        cart.products.splice(productIndex, 1);
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async emptyCart(cid) {
    if (!cid) {
      CustomError.createCustomError({
        name: ErrorsName.CART_DATA_INCOMPLETE,
        cause: ErrorsCause.CART_DATA_INCOMPLETE,
        message: ErrorsMessage.CART_DATA_INCOMPLETE,
      });
    }
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
      }

      cart.products = [];

      await cart.save();
      return cart.products;
    } catch (error) {
      console.log(error);
    }
  }

  async editProductQty(cid, pid, quantity) {
    if (!cid || !pid || !quantity) {
      CustomError.createCustomError({
        name: ErrorsName.CART_DATA_INCOMPLETE,
        cause: ErrorsCause.CART_DATA_INCOMPLETE,
        message: ErrorsMessage.CART_DATA_INCOMPLETE,
      });
    }
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
      }

      let productIndex = cart.products.findIndex((el) => el.id == pid);

      await cart.save();
      return cart.products[productIndex];
    } catch (error) {
      console.log(error);
    }
  }

  async editCart(cid, newCart) {
    if (!cid || !newCart) {
      CustomError.createCustomError({
        name: ErrorsName.CART_DATA_INCOMPLETE,
        cause: ErrorsCause.CART_DATA_INCOMPLETE,
        message: ErrorsMessage.CART_DATA_INCOMPLETE,
      });
    }
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
      }

      cart.products = newCart;

      await cart.save();
      return cart.products;
    } catch (error) {
      console.log(error);
    }
  }

  async completeSale(cid, userFulllName) {
    if (!cid || !userFulllName) {
      CustomError.createCustomError({
        name: ErrorsName.CART_DATA_INCOMPLETE,
        cause: ErrorsCause.CART_DATA_INCOMPLETE,
        message: ErrorsMessage.CART_DATA_INCOMPLETE,
      });
    }

    const productsWithoutEnoughStock = [];
    let unitPrices = [];
    let ticket;
    let product;
    let cart;
    let el;
    let newProductsInCart = [];
    try {
      cart = await cartsModel.findOne({ _id: cid });
      if (!cart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
      }
      let iterations = cart.products.length;

      for (let index = 0; index < iterations; index++) {
        el = cart.products[index];

        product = await productsModel.findOne({ _id: el.id });

        if (el.quantity <= product.stock) {
          //modifica el stock de productos
          product.stock = product.stock - el.quantity;

          //para calcular total
          let subtotal = product.price * el.quantity;
          unitPrices = [...unitPrices, subtotal];

          await product.save();
          //modifica el carrito
          // cart.products.splice(index, 1);
        } else {
          newProductsInCart.push(el);
          productsWithoutEnoughStock.push(el.id);
          console.log(`cantidad de stock insuficiente del producto ${product}`);
        }
      }

      cart.products = newProductsInCart;

      await cart.save();
      const tickets = await ticketsModel.find();

      let code = parseInt(tickets[tickets.length - 1].code) + 1;
      ticket = await ticketsModel.create({
        code: `${code}`,
        purchase_datetime: new Date().toLocaleString(),
        amount: unitPrices.reduce((acc, el) => acc + el, 0),
        purchaser: userFulllName,
      });
      console.log("ticket del manager", ticket);

      return { ticket, productsWithoutEnoughStock };
    } catch (error) {
      console.log(error);
    }
  }
}
