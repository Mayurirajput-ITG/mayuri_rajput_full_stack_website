import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

export const addedToCart = async (customer_id, product_id, quantity, price) => {

  const product = await Product.findById(product_id);
  if (!product)
    throw new Error("Product not found");;
  // Prepare snapshot
  const productSnapshot = {
    product_id: product_id,
    product_name: product?.product_name,
    description: product?.description,
    price: product?.price,
    category: product?.category,
    stock_quantity: product?.stock_quantity,
    sku: product?.sku,
    weight_kg: product?.weight_kg,
    is_active: product?.is_active,
    product_img: product?.product_img,
    status: product?.status,
    quantity,
  };
  let cart = await Cart.findOne({ customer_id });
  if (!cart) {
    const createCart = await Cart.create({
      customer_id,
      items: [productSnapshot],
    })
  } else {
    const existingItem = cart.items.find(
      (item) => item.product_id === product_id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price += price;
    } else {
      cart.items.push(productSnapshot);
    }
    await cart.save();
  }
  return cart;
  // res.json({ message: "Added to cart", cart });
}


export const cartDataById = async (customer_id) => {
return await Cart.find({ customer_id }); 

};

export const deleteCartData=async(customer_id)=>{
  const cartData=await Cart.find({customer_id});
  
}