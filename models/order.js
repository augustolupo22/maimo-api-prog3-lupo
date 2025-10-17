import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      username: { type: String, required: true },
      company: { type: String },
      email: { type: String, required: true },
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
