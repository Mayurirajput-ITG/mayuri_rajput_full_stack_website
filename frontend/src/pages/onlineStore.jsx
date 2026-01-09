import React, { useEffect, useState } from "react";
import "../assets/onlineStore.css";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { Outlet } from "react-router-dom";
export default function OnlineStore() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isModelOPen, setIsModelOPen] = useState(false);
  const [product, setProducts] = useState([]);
  const handleCartModel = () => {
    setIsModelOPen(true);
    const fetchCartData = async () => {
      try {
        const response = await fetch(`http://localhost:7000/api/cart/${user?.id}`);
        const data = await response.json();

        setProducts(data?.data[0]?.items);
        // setCustomer(data.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartData();
  }
  console.log(product)
  const handleClose = () => {
    setIsModelOPen(false);
  }
  const handleDeleteCartItem=()=>{
   try{
    
   }catch(error){

   }
  }
  return (
    <div class="onlinestore-main-container">
      <div className="navbar">
        <div className="left">
          <div className="logo">BIG BAZAR</div>
          <input className="search" placeholder="Search for products..." />
        </div>

        <div className="right">
          <span className="menu">Categories</span>
          <span className="menu">About Us</span>
          <span className="menu">Contact Us</span>
          <span className="menu red">Offers</span>

          <div className="icons">
            <span className="icon"><BsCart4 onClick={() => { handleCartModel() }}></BsCart4></span>
            <span className="icon"><IoIosNotificationsOutline></IoIosNotificationsOutline></span>
            <span className="icon"><CgProfile></CgProfile></span>
          </div>
        </div>
      </div>
      {isModelOPen &&
        <div className={`ap-overlay ${isModelOPen ? "show" : ""}`}>
          <div className={`ap-modal ${isModelOPen ? "slide-in" : ""}`}>
            <div className="ap-header">
              <h2>Cart Details</h2>
              <FiX className="ap-close" onClick={() => { setIsModelOPen(false) }} />
            </div>
            <div class="cart-details">
              {product.map((item, index) => {
                return (
                  <div className="cart-product-details">
                    <div className="cart-product-img">
                      <img src={item?.product_img}></img>
                    </div>
                    <div className="cart-product-info">
                      <h5>{item?.product_name}</h5>
                      <p>{item?.category}</p>
                      <p>{item?.price}</p>
                    </div>
                    <div className="cart-product-price">
                      <FiTrash2 className="icon" onClick={() => { handleDeleteCartItem() }} />
                    </div>
                  </div>

                )
              })}

            </div>
            <div className="cart-footer">
              <button className="place_order_btn">Place The Order</button>
              <button className="close_btn" onClick={() => { setIsModelOPen(false) }}>close</button>
            </div>
          </div>
        </div>}
      <Outlet></Outlet>
    </div>
  );
}
