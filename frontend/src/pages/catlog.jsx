import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiUpload, FiDownload, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import "../assets/catlog.css";
import AddProductModal from "../components/AddProduct";
export default function Catlog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [products, setProducts] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/products//product-list");
        const data = await response.json();
        if (data.status) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, [])
  const handleToggle = async (product) => {
    const updatedValue = !product.is_active;   // toggle value

    try {
      const response = await fetch(
        `http://localhost:7000/api/products/status/${product._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_active: updatedValue }),
        }
      );

      const data = await response.json();

      if (data.status) {
        // update UI state
        setProducts(prev =>
          prev.map(p =>
            p._id === product._id ? { ...p, is_active: updatedValue } : p
          )
        );
      }
    } catch (error) {
      console.log("Toggle Error: ", error);
    }
  };
  const handleViewProduct = async (product) => {
    // console.log({product});
    navigate(`/dashboard/catlog/${product._id}`);
  }
  const handleDeleteProduct = async (product) => {
    setSelectedProduct(product)
    setDeleteModal(true);
  }
  const handleEditProduct = async (product) => {
    setOpenAddModal(true)
    setSelectedProduct(product)
  }
  const handleDelete = async (product) => {
    try {
      const response = await fetch(`http://localhost:7000/api/products/${product._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.status) {
        setDeleteModal(false);
        setSelectedProduct(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleAddProduct = async (product) => {
    console.log({ product })
    try {
      const payload = {
        "product_name": product.product_name,
        "sku": product.sku,
        "category": product.category,
        "description": product.description,
        "stock_quantity": product.stock_quantity,
        "price": product.price,
        "product_img": product.product_img
      }
      const endPoint = selectedProduct?._id ? selectedProduct?._id : "add"
      const response = await fetch(
        `http://localhost:7000/api/products/${endPoint}`,
        {
          method: selectedProduct?._id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload }),
        }
      );
      const data = await response.json();
      if (data.status) {
        setOpenAddModal(false);
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="product-page">
      {/* Page Header */}
      <div className="product-header">
        <h2>Products</h2>
        <div className="product-actions">
          <button className="btn export"><FiDownload /> Export</button>
          <button className="btn import"><FiUpload /> Import</button>
          <button className="btn bulk">Bulk Action</button>
          <button className="btn delete">Delete</button>
          <button className="btn add" onClick={() => {
            setOpenAddModal(true);
            setSelectedProduct(null);
          }}>+ Add Product</button>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-box">
        <div className="filter-row">
          <div className="search-input">
            <FiSearch className="search-icon" />
            <input
              placeholder="Search Product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Category</option>
            <option value="Men">Men</option>
            <option value="Skin Care">Skin Care</option>
            <option value="Fresh Vegetable">Fresh Vegetable</option>
          </select>

          <select className="select" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="">Price</option>
            <option value="low-high">Low → High</option>
            <option value="high-low">High → Low</option>
          </select>

          <button className="filter-btn">Filter</button>
          <button className="reset-btn">Reset</button>
        </div>
        <table className="product-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>PRODUCT NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>SALE PRICE</th>
              <th>STOCK</th>
              <th>STATUS</th>
              <th>VIEW</th>
              <th>PUBLISHED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td><input type="checkbox" /></td>
                <td className="product-name">
                  <img src={p.product_img} alt="" className="prod-img" />
                  {p.product_name}
                </td>
                <td>{p.category}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.stock_quantity}</td>
                <td><span className="status-badge">{p.status}</span></td>
                <td>
                  <FiEye className="icon" onClick={() => { handleViewProduct(p) }} />
                </td>
                <td>
                  <label className="switch">
                    <input type="checkbox" checked={p.is_active} onChange={() => handleToggle(p)} readOnly />
                    <span className="slider"></span>
                  </label>
                </td>
                <td className="actions">
                  <FiEdit2 className="icon" onClick={() => { handleEditProduct(p) }} />
                  <FiTrash2 className="icon" onClick={() => { handleDeleteProduct(p) }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Table */}
      {openAddModal && <AddProductModal open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        selectedProduct={selectedProduct}
        onAdd={(data) => handleAddProduct(data)}></AddProductModal>}
      {openDeleteModal &&
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h3>Delete Product</h3>
            <p>Are you sure you want to delete product</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => {
                setDeleteModal(false)
                setSelectedProduct(null);
              }
              }>Cancel</button>
              <button className="delete-btn" onClick={() => handleDelete(selectedProduct)}>Delete</button>
            </div>
          </div>
        </div>}
    </div>
  );
}
