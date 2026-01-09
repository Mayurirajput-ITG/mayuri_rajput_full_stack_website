import express from "express";
const cartRouter = express.Router();
import { addToCart ,getCartItemById,deleteCartItems} from "../controller/cartController.js";
cartRouter.post('/add', addToCart);
cartRouter.get('/:id',getCartItemById);
cartRouter.delete('/:id',deleteCartItems);
export default cartRouter;