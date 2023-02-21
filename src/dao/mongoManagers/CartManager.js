import { cartsModel } from "../models/carts.model.js"

export default class CartManager {

    async  addCart (cart) {
        try {
            const newCart = await cartsModel.create(cart) 
            return newCart
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getCarts () {
        try {
            const carts = await cartsModel.find().lean()
            return carts
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getCartById (cid) {
try {
    const cart = await cartsModel.findById(cid).lean()
    return cart
} catch (error) {
    console.log(error)
    return error
}
    }

   async addProductToCart (cid, pid) {
    
    try {
    //     const cart = await cartsModel.findOneAndUpdate({_id: cid}, {$push: {id: pid}},  { upsert: true })
    
    // console.log(cart)
         const cart = await cartsModel.findOne({_id: cid}) 
     console.log('aca', cart)
      if(!cart) return console.log('carrito no encontrado')

      console.log('here', cart.cart.findIndex(el=> el.id == pid))//0
     
     if (cart.cart.findIndex(el=> el.id == pid) !== -1 ) {
        cart.cart[cart.cart.findIndex(el=> el.id == pid)].quantity +=1
        console.log('nuevo', cart)
    }else {
        cart.cart.push({id: pid, quantity:1})
     }
  
      await cart.save()
     
      return cart
    } catch (error) {
        console.log(error)
        return error
    }
   }

//  async addProductToCart(id, producto) {
//         try {

//             const cart = await CarritosModel.findOne({ _id: id });

//             if (!cart) return { error: 'carrito no encontrado' }

//             cart.productos.push(producto);

//             await cart.save();

//             return { message: `Se agregó el producto: '${producto.nombre}' al carrito ID: ${id}` };
//         } catch (err) {
//             loggerError.error(err);
//         }
//     }



}