// import React, { useState } from "react";
// import LoginImage from "../assets/images/login-main.jpeg";
// import { useNavigate } from "react-router-dom";
// import "../assets/main.css";

// export default function Login() {
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     email: "",
//     password: "",
//   });
//   // Input handler
//   const handleChange = (e) => {
//     setState({
//       ...state,
//       [e.target.name]: e.target.value,
//     });
//   };
//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       email: state.email,
//       password: state.password,
//     };
//     try {
//       const response = await fetch("http://localhost:7000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       if (data.status) {
//        localStorage.setItem("user", JSON.stringify(data?.user));
//         if (data.user.role === 1) {
//           navigate("/dashboard");
//         } else {
//           navigate("/customer")
//         }
//       }
//       // console.log("Login Response:", data);
//     } catch (error) {
//       console.error("Login Error:", error);
//     }
//   };
//   return (
//     <div className="main-login-container">
//       <div className="login-card">
//         <div className="login-left">
//           <img src={LoginImage} alt="login" />
//         </div>

//         <div className="login-right">
//           <h2 className="login-title">Admin Login</h2>

//           <form onSubmit={handleSubmit}>
//             {/* Email */}
//             <div className="form-control">
//               <label>Email</label>
//               <input
//                 type="text"
//                 name="email"
//                 value={state.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//               />
//             </div>

//             {/* Password */}
//             <div className="form-control">
//               <label>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={state.password}
//                 onChange={handleChange}
//                 placeholder="Enter password"
//               />
//             </div>

//             <button className="login-btn">Login</button>
//           </form>

//           <p className="link">Forgot your password</p>
//           <p className="link"><a href="/register">Create an account</a></p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import "../assets/login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
    title: "",
    gradeLevels: [],
    accountType: "",
    country: "",
    schoolName: "",
    schoolAddress: "",
    streetAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "gradeLevels") {
      setFormData((prev) => ({
        ...prev,
        gradeLevels: checked
          ? [...prev.gradeLevels, value]
          : prev.gradeLevels.filter((g) => g !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      <h4>Sign Up Form</h4>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="row">
          <div className="col">
            <label>Name *</label>
            <input
              type="text"
              name="firstName"
              placeholder="First"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>&nbsp;</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
        <div className="field">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="row">
          <div className="col">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>&nbsp;</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Newsletter */}
        <div className="checkbox">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          <span>Subscribe to our free newsletter</span>
        </div>

        {/* Professional Title */}
        <div className="field">
          <label>Professional Title *</label>
          <select name="title" value={formData.title} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Teacher">Specialist Teacher/Coach</option>
            <option value="Admin">Administrator</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Grade Level */}
        <div className="field">
          <label>Grade Level</label>
          <div className="checkbox-group">
            {[
              "Early Childhood",
              "Pre-Kindergarten",
              "Kindergarten",
              "1st Grade",
              "2nd Grade",
              "3rd Grade",
              "4th Grade",
              "5th Grade",
              "6th Grade or Above",
              "Other / Not Applicable",
            ].map((grade) => (
              <label key={grade}>
                <input
                  type="checkbox"
                  name="gradeLevels"
                  value={grade}
                  onChange={handleChange}
                />
                {grade}
              </label>
            ))}
          </div>
        </div>

        {/* Account Type */}
        <div className="field">
          <label>Is this a personal or school account? *</label>
          <div className="radio-group">
            {[
              "Personal Account",
              "District Account",
              "School Account",
              "Private/Independent/Other School Account",
            ].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="accountType"
                  value={type}
                  onChange={handleChange}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Country */}
        <div className="field">
          <label>Country</label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Myanmar">Myanmar</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
        </div>

        {/* School Info */}
        <h4>School Information</h4>

        <div className="field">
          <label>School Name *</label>
          <input
            type="text"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>School Address *</label>
          <input
            type="text"
            name="schoolAddress"
            value={formData.schoolAddress}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Street Address</label>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>State / Province / Region</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label>ZIP / Postal Code</label>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
}
