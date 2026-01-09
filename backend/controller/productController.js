import { insertProducts, getProducts, getById, addedProduct, deleteProductById,upateProductById ,updateProductStatus} from "../services/productService.js";

export const addBulkProducts = async (req, res) => {
  try {
    const products = req.body.products;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({
        status: false,
        message: "Products must be an array"
      });
    }
    const inserted = await insertProducts(products);
    res.status(201).json({
      status: true,
      message: "Products inserted successfully",
      count: inserted.length,
      data: inserted
    });
  } catch (error) {
    console.error("Bulk Insert Error:", error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};


export const getProductList = async (req, res) => {
  try {
    const getProductsList = await getProducts();
    res.status(201).json({
      status: true,
      message: "Products fetched successfully",
      count: getProductsList.length,
      data: getProductsList
    })
  } catch (error) {
    console.error("Product fetch Error:", error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
}

export const getProductByID = async (req, res) => {
  try {
    const { id } = req.params;
    const getProductsList = await getById(id);
    res.status(201).json({
      status: true,
      message: "Products fetched successfully",
      count: getProductsList.length,
      data: getProductsList
    })
  } catch (error) {
    console.error("Product fetch Error:", error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
}

export const addProduct = async (req, res) => {
  try {
    const {
      product_name,
      sku,
      category,
      description,
      stock_quantity,
      price,
      product_img
    } = req.body.payload;

    const product = await addedProduct(
      product_name,
      sku,
      category,
      description,
      stock_quantity,
      price,
      product_img
    );

    res.status(201).json({
      status: true,
      message: "Product added successfully",
      data: product
    });

  } catch (error) {
    console.error("Product Add Error:", error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await deleteProductById(id);
    res.status(201).json({
      status: true,
      message: "Products deleted successfully",
      data: product
    })

  } catch (error) {
    console.error("Product fetch Error:", error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const {
      product_name,
      sku,
      category,
      description,
      stock_quantity,
      price,
      product_img
    } = req.body.payload;
  const {id}=req.params;
    const product = await upateProductById(
      id,
      product_name,
      sku,
      category,
      description,
      stock_quantity,
      price,
      product_img
    );

    res.status(201).json({
      status: true,
      message: "Product updated successfully",
      data: product
    });

  } catch (error) {
    console.error("Product update Error:", error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
}


export const productActiveInactive=async(req,res)=>{
    try {
    const { id } = req.params;
    const { is_active } = req.body;

    const updated = await updateProductStatus(
      id,
      is_active 
    );

    res.json({
      status: true,
      message: "Product status updated",
      data: updated,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}