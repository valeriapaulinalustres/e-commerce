import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
});

cartsSchema.pre("find", function (next) {
  this.populate({ path: "products.id" });
  next();
});

export const cartsModel = mongoose.model("Carts", cartsSchema);

