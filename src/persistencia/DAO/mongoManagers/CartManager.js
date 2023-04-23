import { cartsModel } from "../../mongodb/models/carts.model.js";
import { productsModel } from "../../mongodb/models/products.model.js";
import { ticketsModel } from "../../mongodb/models/tickets.model.js";

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
      console.log(cart);
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
    let unitPrices = [];
    let ticket;
    let product;
    let cart;
    let el;
    let newProductsInCart = []
    try {
       cart = await cartsModel.findOne({ _id: cid });
console.log('cart',cart)
      let iterations =cart.products.length
     
      for (let index = 0; index < iterations; index++) {
     
        console.log('cart dentro del for', cart)
        el = cart.products[index];
        console.log('el',el)
        console.log("entra al for", index + 1);
        product = await productsModel.findOne({ _id: el.id });

        if (el.quantity <= product.stock) {
          console.log("pasa x if", index + 1);
          //modifica el stock de productos
          product.stock = product.stock - el.quantity;

          //para calcular total
          let subtotal = product.price * el.quantity;
          unitPrices = [...unitPrices, subtotal];

          await product.save();
          //modifica el carrito
         // cart.products.splice(index, 1);

        } else {
          newProductsInCart.push(el)
          productsWithoutEnoughStock.push(el.id);
          console.log(`cantidad de stock insuficiente del producto ${product}`);
        }
      }

      cart.products = newProductsInCart
      console.log('cart al final', cart)
    
      await cart.save();
      const tickets = await ticketsModel.find();

      let code = parseInt(tickets[tickets.length - 1].code) + 1;
      ticket = await ticketsModel.create({
        code: `${code}`,
        purchase_datetime: new Date().toLocaleString(),
        amount: unitPrices.reduce((acc, el) => acc + el, 0),
        purchaser: "Valeria",
      });
      console.log("ticket del manager", ticket);
  

      return { ticket, productsWithoutEnoughStock };
    } catch (error) {
      console.log(error);
    }
  }
}
