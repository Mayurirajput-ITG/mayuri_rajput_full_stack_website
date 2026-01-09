import React, { useEffect, useState } from "react";
import "../../assets/onlineStore.css";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/products/product-list");
        const data = await response.json();
        if (data.status) setProducts(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, []);
  const handleProductClick = (item) => {
    console.log("item................", item);
    navigate(`/onlinestore/product/${item._id}`)
  }
  return (
    <div >

      <div className="product-grid">
        {products?.map((item) => (
          <div className="product-card" key={item._id} onClick={() => { handleProductClick(item) }}>
            <div className="product-img">
              <img src={item.product_img} alt={item.product_name} />
              <button className="add-btn" >+</button>
            </div>

            <div className="product-info">
              <div className="product-name">{item.product_name}</div>
              <div className="product-price">${item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
