import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiUpload,
  FiUploadCloud,
  FiDownload,
  FiX
} from "react-icons/fi";
import "../assets/customer.css";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [customers, setCustomer] = useState([]);
  const [file, setFile] = useState();
  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState({ name: "", email: "", id: "" });
  const [isImportModal, setIsImportModal] = useState(false);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/users");
        const data = await response.json();
        setCustomer(data.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomers();
  }, []);

  const handleViewCustomer = async (cust) => {
    console.log({ cust });
    try {
      const response = await fetch(`http://localhost:7000/api/users/${cust._id}`);
      const data = await response.json();
      console.log({ data });
    } catch (error) {
      console.error(error);
    }
  }

  // Open Modal + Set selected customer
  const handleEdit = (cust) => {
    setEditUser({
      id: cust._id,
      name: cust.name,
      email: cust.email,
    });
    setShowModal(true);
  };

  // Update API Call
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:7000/api/users/${editUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editUser.name,
            email: editUser.email,
          }),
        }
      );

      const data = await response.json();
      console.log("Update response:", data);

      // Update UI instantly
      setCustomer((prev) =>
        prev.map((item) =>
          item._id === editUser.id ? { ...item, ...editUser } : item
        )
      );

      setShowModal(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };
  const handleDelete = async (selectedUser) => {
    try {
      console.log({ selectedUser });
      const response = await fetch(`http://localhost:7000/api/users/${selectedUser._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.status) {
        setCustomer((prev) => prev.filter(item => item._id !== selectedUser._id));
        setShowDeleteModal(false);
      }
    }
    catch (error) {
      console.error("Update error:", error);
    }
  }
  const handleImportModal = () => {
    setIsImportModal(true);
  }
  const handleExportCustomer = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/customer/export", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch the CSV.");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "customers.csv"; // filename
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Update error:", error);
    }
  }
  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
  }
  const handleImportCustomer = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("http://localhost:7000/api/customer/import", {
        method: "POST",
        body: formData,
        redirect: "follow",
      })
    }
    catch (error) {
      console.error("Update error:", error);
    }
  }
  return (
    <div className="customer-page">
      <div className="customer-header">
        <h2>Customers</h2>
        <div className="customer-actions">
          <button className="top-btn" onClick={() => { handleExportCustomer() }}>
            <FiDownload /> Export
          </button>
          <button className="top-btn" onClick={() => { handleImportModal() }}>
            <FiUpload /> Import
          </button>
        </div>
      </div>

      <div className="customer-box">
        <div className="search-row">
          <div className="search-input">
            <FiSearch className="search-icon" />
            <input
              placeholder="Search by name/email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="filter-btn">Filter</button>
          <button className="reset-btn">Reset</button>
        </div>

        <table className="customer-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>JOINING DATE</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust, index) => (
              <tr key={cust._id}>
                <td>{index + 1}</td>
                <td>
                  {new Date(cust.createdAt).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>{cust.name}</td>
                <td>{cust.email}</td>
                <td>{cust.role === 0 ? "Customer" : ""}</td>
                <td className="actions">
                  <FiEye className="icon" onClick={() => handleViewCustomer(cust)} />
                  <FiEdit2 className="icon" onClick={() => handleEdit(cust)} />
                  <FiTrash2 className="icon" onClick={() => openDeleteModal(cust)} />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --------------------------- MODAL --------------------------- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Edit User</h3>
              <FiX className="close-icon" onClick={() => setShowModal(false)} />
            </div>

            <div className="modal-body">
              <label>Name</label>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />

              <label>Email</label>
              <input
                type="text"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="update-btn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Delete User</h3>
            <p>Are you sure you want to delete <b>{selectedUser?.name}</b>?</p>

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="delete-btn" onClick={() => handleDelete(selectedUser)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {isImportModal &&
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="ap-dropzone">
              <input type="file" onChange={handleUpload} />
              <FiUploadCloud className="ap-upload-icon" />
              <p>Drag your file here</p>
              <span>(Only *.csv allowed)</span>
            </div>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setIsImportModal(false)}>Cancel</button>
              <button className="update-btn" onClick={() => handleImportCustomer()}>Upload</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
