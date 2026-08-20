import React, { useState } from "react";
import axios from "axios";
import a from './signup.jpg';
import { API_BASE_URL } from "./config";

export default function Form() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    pass: "",
    address: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
    return username.length >= 6 && regex.test(username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUsername(form.fullname)) {
      setMessage("Username must be at least 6 characters and include only letters, numbers, or special characters.");
      return;
    }

    if (form.password !== form.pass) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/signupform`, form, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });

      if (res.status === 200 && res.data.success) {
        window.location.href = "/";
      } else {
        setMessage(res.data.message || "Signup failed.");
      }
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message || "Signup failed.");
      } else {
        setMessage("Error communicating with server.");
      }
    }
  };

  const bgStyle = {
    backgroundImage: `url(${a})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px"
  };

  const formStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(8px)",
    padding: "30px 40px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px"
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #7c3aed, #9333ea)",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "15px",
    width: "100%",
    transition: "transform 0.2s ease"
  };

  const messageStyle = {
    marginTop: "15px",
    fontSize: "14px",
    color: "#ef4444"
  };

  const linkStyle = {
    marginTop: "10px",
    fontSize: "14px",
    display: "block",
    color: "#3b82f6",
    textDecoration: "none"
  };

  return (
    <div style={bgStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ color: "black" }}>Sign Up</h2>
        <input
          name="fullname"
          placeholder="Full Name"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
  name="address"
  placeholder="Address"
  onChange={handleChange}
  required
  style={inputStyle}
/>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="pass"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Sign Up</button>
        {message && <p style={messageStyle}>{message}</p>}
        <a href="/login" style={linkStyle}>Already have an account? Log in</a>
      </form>
    </div>
  );
}
