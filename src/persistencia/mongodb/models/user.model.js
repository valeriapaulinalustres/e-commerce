import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "user",
  },

  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carts",
    required: false,
  },
  tokenResetPassword: {
    type: String,
    required: false,
  },
  documents: {
    type: [
      {
        name: { type: String },
        reference: { type: String },
      },
    ],
    required: false,
  },
  lastConnection: {
    type: String,
    required: false,
  },
});

export const userModel = mongoose.model("Users", usersSchema);
