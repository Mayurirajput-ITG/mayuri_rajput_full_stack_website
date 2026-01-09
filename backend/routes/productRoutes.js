
import express from "express";
import { addBulkProducts, getProductList, getProductByID ,addProduct,deleteProduct,updateProduct,productActiveInactive} from "../controller/productController.js";


const productRouter = express.Router();
productRouter.post("/add-bulk", addBulkProducts);
productRouter.get("/product-list", getProductList);
productRouter.get("/:id", getProductByID);
productRouter.post("/add",addProduct);
productRouter.delete("/:id",deleteProduct);
productRouter.put("/:id",updateProduct);
productRouter.put("/status/:id",productActiveInactive)
export default productRouter;