import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
      unique: true,
    },
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock_quantity: {
      type: Number,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    weight_kg: {
      type: Number,
      default: 0,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    //  NEW FIELD — product image
    product_img: {
      type: String,
      default: "",
    },
    // ⭐ NEW FIELD — product status
    status: {
      type: String,
      enum: ["Selling", "Out of Stock", "Draft", "Inactive"],
      default: "Selling",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Product", productSchema);
