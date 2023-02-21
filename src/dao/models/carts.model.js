import mongoose from 'mongoose'

const cartsSchema = new mongoose.Schema({
    cart: {
        type: [{id:String, quantity:Number}],
        required: true,
        unique: true
    }
   
})

export const cartsModel = mongoose.model('Carts', cartsSchema)