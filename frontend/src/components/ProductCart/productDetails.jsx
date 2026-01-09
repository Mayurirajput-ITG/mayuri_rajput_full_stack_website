import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/catlog.css"

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:7000/api/products/${id}`);
        const data = await res.json();
        if (data.status) {
          setProduct(data.data);
          setTotalPrice(data.data.price);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);
  console.log({ product });
  const handleAddToCart = async () => {
    try {
      const payload = {
        customer_id: user?.id,
        product_id: product?._id,
        quantity: quantity,
        price: totalPrice,
      }
      const response = await fetch('http://localhost:7000/api/cart/add', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( payload),
      })
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity, product]);

  const increaseQty = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
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
          <div style={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
            <button
              onClick={decreaseQty}
              style={{
                padding: "6px 12px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              -
            </button>

            <span
              style={{
                margin: "0 15px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {quantity}
            </span>

            <button
              onClick={increaseQty}
              style={{
                padding: "6px 12px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
          <p className="pd-desc">{product.description}</p>

          <p className="pd-cat-title">
            <strong>Category:</strong> {product.category}
          </p>
          Total Price: <span style={{ color: "green" }}>₹{totalPrice}</span>
          <div className="pd-tags">
            <span className="pd-tag">{product.category.toLowerCase()}</span>
            <span className="pd-tag">{product.product_name.toLowerCase()}</span>
            <span className="pd-tag">new-{product.category.toLowerCase()}</span>
          </div>
          <button className="pd-edit-btn" onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
