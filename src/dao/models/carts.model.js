import mongoose from 'mongoose'

const cartsSchema = new mongoose.Schema({
    cart: {
        type: Array,
        required: true,
        unique: true
    }
   
})

export const cartsModel = mongoose.model('Carts', cartsSchema)