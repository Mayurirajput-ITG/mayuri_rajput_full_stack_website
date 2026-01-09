import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    product_name: String,
    description: String,
    price: Number,
    category: String,
    stock_quantity: Number,
    sku: String,
    weight_kg: Number,
    is_active: Boolean,
    product_img: String,
    status: String,
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [cartItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
