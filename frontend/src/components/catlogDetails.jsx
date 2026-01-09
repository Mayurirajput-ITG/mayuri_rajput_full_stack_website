import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/catlog.css"

export default function CatlogDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:7000/api/products/${id}`);
        const data = await res.json();
        if (data.status) {
          setProduct(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div className="pd-container">
      <h2 className="pd-title">Product Details</h2>

      <div className="pd-main-box">

        {/* LEFT: IMAGE */}
        <div className="pd-img-box">
          <img src={product.product_img} alt="" />
        </div>

        {/* RIGHT: DETAILS */}
        <div className="pd-info-box">

          <p className="pd-status">
            <strong>Status:</strong>{" "}
            <span className="pd-status-green">
              {product.status === "active"
                ? "This product Showing"
                : "Inactive"}
            </span>
          </p>

          <h1 className="pd-name">{product.product_name}</h1>

          <p className="pd-sku">
            <strong>SKU:</strong> {product.sku || "—"}
          </p>

          <h2 className="pd-price">${product.price}</h2>

          <div className="pd-stock-row">
            <span className="pd-stock-badge">
              {product.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
            <span className="pd-qty">QUANTITY: {product.stock_quantity}</span>
          </div>

          <p className="pd-desc">{product.description}</p>

          <p className="pd-cat-title">
            <strong>Category:</strong> {product.category}
          </p>

          <div className="pd-tags">
            <span className="pd-tag">{product.category.toLowerCase()}</span>
            <span className="pd-tag">{product.product_name.toLowerCase()}</span>
            <span className="pd-tag">new-{product.category.toLowerCase()}</span>
          </div>

          <button className="pd-edit-btn">Edit Product</button>
        </div>
      </div>
    </div>
  );
}
