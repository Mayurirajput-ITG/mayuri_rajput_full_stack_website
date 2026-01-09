import Product from "../models/Product.js";

export const insertProducts = async (products) => {
  // Insert many products at once
  const result = await Product.insertMany(products);
  return result;
};
export const getProducts = async () => {
  const result = await Product.find();
  return result;
}
export const getById = async (id) => {
  const result = await Product.findById(id);
  return result;
}
export const addedProduct = async (
  product_name,
  sku,
  category,
  description,
  stock_quantity,
  price,
  product_img
) => {

  const product_id = "PRD-" + Date.now(); // auto ID
  const result = await Product.create({
    product_id,
    product_name,
    sku,
    category,
    description,
    stock_quantity,
    price,
    product_img
  });

  return result;
}
export const deleteProductById = async (id) => {
  const product = await Product.deleteOne(
    { _id: id }
  );
  return product;
}
export const upateProductById = async (id,
  product_name,
  sku,
  category,
  description,
  stock_quantity,
  price,
  product_img) => {
  const product = await Product.updateOne(
    { _id: id },
    {
      $set: {
        product_name,
        sku,
        category,
        description,
        stock_quantity,
        price,
        product_img
      }
    }
  );
  return product;
}
export const updateProductStatus = async (id, is_active) => {

  const product = await Product.findByIdAndUpdate(
    id,
    { is_active },
    { new: true }
  );
  if (!product) {
    return res.status(404).json({
      status: false,
      message: "Product not found",
    });
  }
  return product;
}