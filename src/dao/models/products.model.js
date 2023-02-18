import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
title: {
    type: String,
    required: true
},
description : {
    type: String,
    required: true
},
price: {
    type: Number,
    required: true
},
thumbnails: [
    {
        type:String
    }
],
code: {
    type: String,
    required: true,
    unique: true
},
stock:{
    type: Number,
    required: true
},
status: {
    type: Boolean,
    required: true
},
category: {
    type: String,
    required: true
}
})

export const productsModel = mongoose.model('Products', productsSchema)