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
    try {
      for (let i = 0; i < cart.length; i++) {
        if (!cart[i].quantity || !cart[i].id) {
          CustomError.createCustomError({
            name: ErrorsName.CART_DATA_INCOMPLETE,
            cause: ErrorsCause.CART_DATA_INCOMPLETE,
            message: ErrorsMessage.CART_DATA_INCOMPLETE,
          });
          return;
        }

        if (cart[i].id.length != 24) {
          CustomError.createCustomError({
            name: ErrorsName.PRODUCT_DATA_INCORRECT_ID,
            cause: ErrorsCause.PRODUCT_DATA_INCORRECT_ID,
            message: ErrorsMessage.PRODUCT_DATA_INCORRECT_ID,
          });
          return;
        }

        let exitsProduct = await productsModel.findById(cart[i].id);

        if (exitsProduct === null) {
          CustomError.createCustomError({
            name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
            cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
            message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          });
          return;
        }
      }

      let newCartFromUuser = { products: cart };

      const newCart = await cartsModel.create(newCartFromUuser);
      return { message: "Carrito creado con éxito", cart: newCart };
    } catch (error) {
      console.log("Error desde el manager", error);
      return error;
    }
  }

  async getCarts() {
    try {
      const carts = await cartsModel.find().lean();
      return carts;
    } catch (error) {
      console.log("Error desde el manager", error);
      return error;
    }
  }

  async getCartById(cid) {
    try {
      if (cid.length !== 24) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_INCORRECT_ID,
          cause: ErrorsCause.CART_DATA_INCORRECT_ID,
          message: ErrorsMessage.CART_DATA_INCORRECT_ID,
        });
        return;
      }

      const existCart = await cartsModel.findById(cid);

      if (!existCart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
        return;
      }

      const cart = await cartsModel
        .findById(cid)
        .populate({ path: "products.id" })
        .lean();

      return cart;
    } catch (error) {
      console.log("Error desde el manager", error);
      return error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      if (cid.length != 24 || pid.length != 24) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_INCORRECT_ID,
          cause: ErrorsCause.CART_DATA_INCORRECT_ID,
          message: ErrorsMessage.CART_DATA_INCORRECT_ID,
        });
        return;
      }

      const cart = await cartsModel.findOne({ _id: cid });
      const existsProduct = await productsModel.findById(pid);
      if (!cart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
        return;
      }

      if (!existsProduct) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
        });
        return;
      }

      if (cart.products.findIndex((el) => el.id == pid) !== -1) {
        cart.products[
          cart.products.findIndex((el) => el.id == pid)
        ].quantity += 1;
      } else {
        cart.products.push({ id: pid, quantity: 1 });
      }

      await cart.save();

      return cart;
    } catch (error) {
      console.log("Error desde el manager", error);
      return error;
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      if (cid.length != 24 || pid.length != 24) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_INCORRECT_ID,
          cause: ErrorsCause.CART_DATA_INCORRECT_ID,
          message: ErrorsMessage.CART_DATA_INCORRECT_ID,
        });
        return;
      }

      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
        return;
      }
      const existsProduct = await productsModel.findById(pid);
      if (!existsProduct) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
        });
        return;
      }

      let productIndex = cart.products.findIndex((el) => el.id == pid);

      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1;
      } else {
        cart.products.splice(productIndex, 1);
      }

      await cart.save();
      return { message: "Product deleted from cart successfully", cart };
    } catch (error) {
      console.log("Error desde el manager", error);
      return error;
    }
  }

  async emptyCart(cid) {
    try {
      if (cid.length != 24) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_INCORRECT_ID,
          cause: ErrorsCause.CART_DATA_INCORRECT_ID,
          message: ErrorsMessage.CART_DATA_INCORRECT_ID,
        });
        return;
      }

      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
        return;
      }

      cart.products = [];

      await cart.save();
      return { message: "Cart emptied successfully", cart };
    } catch (error) {
      console.log("Error desde el manager", error);
      return error;
    }
  }

  async editProductQty(cid, pid, quantity) {
    try {
      if (cid.length != 24 || pid.length != 24) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_INCORRECT_ID,
          cause: ErrorsCause.CART_DATA_INCORRECT_ID,
          message: ErrorsMessage.CART_DATA_INCORRECT_ID,
        });
        return;
      }

      if (!cid || !pid || !quantity) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_INCOMPLETE,
          cause: ErrorsCause.CART_DATA_INCOMPLETE,
          message: ErrorsMessage.CART_DATA_INCOMPLETE,
        });
        return;
      }

      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
        return;
      }

      const existsProduct = await productsModel.findById(pid);
      if (!existsProduct) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
        });
        return;
      }

      let productIndex = cart.products.findIndex((el) => el.id == pid);

      cart.products[productIndex].quantity = quantity;

      await cart.save();
      return { message: "Quantity edited successfuly", product: cart };
    } catch (error) {
      console.log("Error desde el manager", error);
      return error;
    }
  }

  async editCart(cid, newCart) {
    try {
      if (cid.length != 24) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_INCORRECT_ID,
          cause: ErrorsCause.CART_DATA_INCORRECT_ID,
          message: ErrorsMessage.CART_DATA_INCORRECT_ID,
        });
        return;
      }
      if (!newCart.quantity) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_INCOMPLETE,
          cause: ErrorsCause.CART_DATA_INCOMPLETE,
          message: ErrorsMessage.CART_DATA_INCOMPLETE,
        });
        return;
      }
      if (newCart.id.length != 24) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_INCORRECT_ID,
          cause: ErrorsCause.CART_DATA_INCORRECT_ID,
          message: ErrorsMessage.CART_DATA_INCORRECT_ID,
        });
        return;
      }

      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
        return;
      }

      const existsProduct = await productsModel.findById(newCart.id);
      if (!existsProduct) {
        CustomError.createCustomError({
          name: ErrorsName.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.PRODUCT_DATA_NOT_FOUND_IN_DATABASE,
        });
        return;
      }

      cart.products = newCart;

      await cart.save();
      return { message: "Cart updated successfully", cart };
    } catch (error) {
      console.log("Error desde el manager", error);
      return error;
    }
  }

  async completeSale(cid, userFulllName) {
    const productsWithoutEnoughStock = [];
    let unitPrices = [];
    let ticket;
    let product;
    let cart;
    let el;
    let newProductsInCart = [];

    try {
      if (cid.length != 24) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_INCORRECT_ID,
          cause: ErrorsCause.CART_DATA_INCORRECT_ID,
          message: ErrorsMessage.CART_DATA_INCORRECT_ID,
        });
        return;
      }

      if (!userFulllName) {
        CustomError.createCustomError({
          name: ErrorsName.USER_DATA_INCOMPLETE,
          cause: ErrorsCause.USER_DATA_INCOMPLETE,
          message: ErrorsMessage.USER_DATA_INCOMPLETE,
        });
        return;
      }
      cart = await cartsModel.findOne({ _id: cid });

      if (!cart) {
        CustomError.createCustomError({
          name: ErrorsName.CART_DATA_NOT_FOUND_IN_DATABASE,
          cause: ErrorsCause.CART_DATA_NOT_FOUND_IN_DATABASE,
          message: ErrorsMessage.CART_DATA_NOT_FOUND_IN_DATABASE,
        });
        return;
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
        } else {
          newProductsInCart.push(el);
          productsWithoutEnoughStock.push(el.id);
        }
      }

      cart.products = newProductsInCart;

      await cart.save();

      if (unitPrices.length > 0) {
        const tickets = await ticketsModel.find();

        let code = parseInt(tickets[tickets.length - 1].code) + 1;
        ticket = await ticketsModel.create({
          code: `${code}`,
          purchase_datetime: new Date().toLocaleString(),
          amount: unitPrices.reduce((acc, el) => acc + el, 0),
          purchaser: userFulllName,
        });

        return {
          message: "Compra realizada con éxito",
          ticket,
          new_cart: cart,
          products_not_bought: productsWithoutEnoughStock,
        };
      } else {
        return {
          message:
            "No se pudo realizar la compra porque la cantidad de productos supera el stock.",
        };
      }
    } catch (error) {
      console.log("Error desde el manager", error);
      return error;
    }
  }
}
