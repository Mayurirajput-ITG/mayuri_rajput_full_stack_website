import React, { useState } from "react";
import "../assets/register.css";
import BgImage from "../assets/images/login-main.jpeg"; // your background image
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register Payload →", form);
    try {
      const response = await fetch("http://localhost:7000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.status) {
        navigate("/dashboard");
      }
      console.log({ data });
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div
      className="register-page"
    // style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="register-card">
        <h2 className="title">CREATE AN ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              placeholder="Repeat your password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* <div className="form-checkbox">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
            />
            <span>I agree all statements in <a href="#">Terms of service</a></span>
          </div> */}

          <button className="register-btn">REGISTER</button>
        </form>

        <p className="login-link">
          Have already an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}
