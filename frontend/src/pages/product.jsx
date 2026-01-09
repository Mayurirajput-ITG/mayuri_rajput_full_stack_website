import React, { useEffect, useState } from "react";
export default function Product() {
  const [product, setProduct] = useState([]);
  useEffect( () => {
    const fetchProduct=async()=>{
    try {
      const response = await fetch("http://localhost:7000/api/products/product-list", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json();
      console.log({ data });
    } catch (error) {
      console.error(error);
    }
  }
  fetchProduct();
  }, []);
  return (
    <>
      <div>hello product</div>
    </>
  )
}