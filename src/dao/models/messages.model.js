import mongoose  from "mongoose";

const messagesSchema = new mongoose.Schema({
user: {
    type: String,
    unique: true,
    require: true
},
message: {
    type: String,
    required: true
}
})

export const messagesModel = mongoose.model('Messages', messagesSchema)