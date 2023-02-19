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
        const cart = await cartsModel.findOneAndUpdate({_id: cid}, {$push: {id: pid}},  { upsert: true })
        return cart
    } catch (error) {
        console.log(error)
        return error
    }
   }

}