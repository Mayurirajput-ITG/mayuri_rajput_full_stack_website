// import addedToCart

import { addedToCart, cartDataById ,deleteCartData} from "../services/cartService.js"


export const addToCart = async (req, res) => {
  try {
    const { customer_id, product_id, quantity, price } = req.body;


    const addToCartData = await addedToCart(
      customer_id,
      product_id,
      quantity,
      price
    )
    res.status(200).json({
      status: true,
      data: addToCartData,
      message: "Added to cart Successfully"
    })
  } catch (error) {
    console.error("Product Add Error:", error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};
export const getCartItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const cartData = await cartDataById(id)
    res.status(200).json({
      status: true,
      data: cartData,
      message: "Added to cart Successfully"
    })
  } catch (error) {
    console.error("Product Add Error:", error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
}
export const deleteCartItems=async(req,res)=>{
  try{
    const{id}=req.params;
    const cartData=await deleteCartData(id);
    res.status(200).json({
      status:true,
      data:cartData,
      message:"Delete Cart Item successfully"
    })
  }
  catch (error) {
    console.error("Product Add Error:", error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
}