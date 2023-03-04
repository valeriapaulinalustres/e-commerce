import { cartsModel } from "../models/carts.model.js"

export default class CartManager {

    async addCart(cart) {
        try {
            const newCart = await cartsModel.create(cart)
            return newCart
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getCarts() {
        try {
            const carts = await cartsModel.find().lean()
            return carts
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getCartById(cid) {
        try {
            const cart = await cartsModel.findById(cid).populate({path:'cart.id'}).lean()
            return cart
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async addProductToCart(cid, pid) {

        try {
            //     const cart = await cartsModel.findOneAndUpdate({_id: cid}, {$push: {id: pid}},  { upsert: true })

            // console.log(cart)
            const cart = await cartsModel.findOne({ _id: cid })
            //  console.log('aca', cart)
            if (!cart) return console.log('carrito no encontrado')

            //   console.log('here', cart.cart.findIndex(el => el.id == pid))//0

            if (cart.cart.findIndex(el => el.id == pid) !== -1) {
                cart.cart[cart.cart.findIndex(el => el.id == pid)].quantity += 1
                console.log('nuevo', cart)
            } else {
                cart.cart.push({ id: pid, quantity: 1 })
            }

            await cart.save()

            return cart
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async deleteProductFromCart(cid, pid) {

        try {
            const cart = await cartsModel.findOne({ _id: cid })
            if (!cart) return console.log('carrito no encontrado')

            let productIndex = cart.cart.findIndex(el => el.id == pid)

            if (cart.cart[productIndex].quantity > 1) {
                cart.cart[productIndex].quantity -= 1
            } else {
                cart.cart.splice(productIndex, 1)
            }

            await cart.save()
            return cart

        } catch (error) {
            console.log(error)
        }
    }

    async emptyCart(cid) {
        try {
            const cart = await cartsModel.findOne({ _id: cid })
            if (!cart) return console.log('carrito no encontrado')

            cart.cart = []
            
            await cart.save()

        } catch (error) {
            console.log(error)
        }
    }

    async editProductQty(cid, pid, quantity) {
        try {
            const cart = await cartsModel.findOne({ _id: cid })
            if (!cart) return console.log('carrito no encontrado')

            let productIndex = cart.cart.findIndex(el => el.id === pid)
            console.log(productIndex)
            cart.cart[productIndex].quantity = quantity

            await cart.save()
            return cart.cart[productIndex]

        } catch (error) {
            console.log(error)
        }
    }

    async editCart(cid, newCart) {
        try {
            const cart = await cartsModel.findOne({ _id: cid })
            if (!cart) return console.log('carrito no encontrado')

            cart.cart = newCart

            await cart.save()
            return cart.cart

        } catch (error) {
            console.log(error)
        }
    }



}