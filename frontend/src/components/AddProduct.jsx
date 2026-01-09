import React, { useState } from "react";
import { FiX, FiUploadCloud } from "react-icons/fi";
import "../assets/catlog.css"

export default function AddProductModal({ open, onClose, onAdd, selectedProduct }) {
  console.log({ selectedProduct })
  const [form, setForm] = useState({
    product_name: selectedProduct?.product_name || "",
    description: selectedProduct?.description || "",
    product_img: selectedProduct?.product_img || "",
    category: selectedProduct?.category || "",
    sku: selectedProduct?.sku || "",
    stock_quantity: selectedProduct?.stock_quantity || "",
    price: selectedProduct?.price || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm({ ...form, product_img: url });
    }
  };

  const handleSubmit = () => {
    onAdd(form);
    onClose();
  };

  return (
    <div className={`ap-overlay ${open ? "show" : ""}`}>
      <div className={`ap-modal ${open ? "slide-in" : ""}`}>

        {/* Header */}
        <div className="ap-header">               
          <h2>Add Product</h2>
          <FiX className="ap-close" onClick={onClose} />
        </div>

        {/* Fields */}
        <div className="ap-body">
          <label>Product Title/Name</label>
          <input
            name="product_name"
            placeholder="Enter Product Title"
            value={form.product_name}
            onChange={handleChange}
          />

          <label>Product Description</label>
          <textarea
            name="description"
            placeholder="Enter Description"
            value={form.description}
            onChange={handleChange}
          />

          <label>Product Images</label>
          <div className="ap-dropzone">
            <input type="file" onChange={handleImageUpload} />
            <FiUploadCloud className="ap-upload-icon" />
            <p>Drag your images here</p>
            <span>(Only *.jpeg, *.webp, *.png allowed)</span>
          </div>

          {form.product_img && (
            <img src={form.product_img} className="ap-preview" alt="preview" />
          )}

          <label>Product Category</label>
          <input
            name="category"
            placeholder="Enter Category"
            value={form.category}
            onChange={handleChange}
          />

          <label>Product SKU</label>
          <input
            name="sku"
            placeholder="Enter SKU"
            value={form.sku}
            onChange={handleChange}
          />

          <label>Quantity</label>
          <input
            name="stock_quantity"
            type="number"
            placeholder="Enter Quantity"
            value={form.stock_quantity}
            onChange={handleChange}
          />

          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="Enter Price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        {/* Footer */}
        <div className="ap-footer">
          <button className="ap-cancel" onClick={onClose}>Cancel</button>
          <button className="ap-add" onClick={handleSubmit}>Add Product</button>
        </div>
      </div>
    </div>
  );
}
