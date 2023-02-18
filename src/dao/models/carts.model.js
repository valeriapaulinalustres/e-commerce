import mongoose from 'mongoose'

const cartsSchema = new mongoose.Schema({
quantity: {
    type: Number,
    required: true
}
})

export const cartsModel = mongoose.model('Carts', cartsSchema)