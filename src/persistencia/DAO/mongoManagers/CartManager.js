import { cartsModel } from "../../mongodb/models/carts.model.js";
import { productsModel } from "../../mongodb/models/products.model.js";

export default class CartManager {
  async addCart(cart) {
    console.log(cart);
    console.log("funciona");
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
    try {
      const cart = await cartsModel
        .findById(cid)
        .populate({ path: "products.id" })
        .lean();
        console.log(cart)
      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      //     const cart = await cartsModel.findOneAndUpdate({_id: cid}, {$push: {id: pid}},  { upsert: true })

      // console.log(cart)
      const cart = await cartsModel.findOne({ _id: cid });
      //  console.log('aca', cart)
      if (!cart) return console.log("carrito no encontrado");

      //   console.log('here', cart.cart.findIndex(el => el.id == pid))//0
      console.log("aca", cart);
      if (cart.products.findIndex((el) => el.id == pid) !== -1) {
        console.log("en if");
        cart.products[
          cart.products.findIndex((el) => el.id == pid)
        ].quantity += 1;
        console.log("nuevo", cart);
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
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) return console.log("carrito no encontrado");

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
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) return console.log("carrito no encontrado");

      cart.products = [];

      await cart.save();
      return cart.products;
    } catch (error) {
      console.log(error);
    }
  }

  async editProductQty(cid, pid, quantity) {
    console.log("llega");
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) return console.log("carrito no encontrado");
      console.log(cart);
      let productIndex = cart.products.findIndex((el) => el.id == pid);
      console.log(productIndex);
      cart.products[productIndex].quantity = quantity;

      await cart.save();
      return cart.products[productIndex];
    } catch (error) {
      console.log(error);
    }
  }

  async editCart(cid, newCart) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) return console.log("carrito no encontrado");

      cart.products = newCart;

      await cart.save();
      return cart.products;
    } catch (error) {
      console.log(error);
    }
  }

  async completeSale(cid) {
    const productsWithoutEnoughStock = [];
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      console.log(cart);
      cart.products.forEach(async (el) => {
        const product = await productsModel.findOne({ _id: el.id });
        console.log(product.stock, el.quantity);
        if (el.quantity <= product.stock) {
          product.stock = product.stock - el.quantity;
          console.log("nuevo stock", product.stock);
          await product.save();

          let cartWithoutProduct = cart.products.filter(
            (el2) => el.id !== el2.id
          );
          console.log("carrito sin producto comprado", cartWithoutProduct);
          await cart.save();
        } else {
          productsWithoutEnoughStock.push(el.id);
          console.log(`cantidad de stock insuficiente del producto ${product}`);
        
        }
      });
      console.log(cart);
      return productsWithoutEnoughStock;

    } catch (error) {
      console.log(error);
    }
  }
}
