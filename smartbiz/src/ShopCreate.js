import React, { useState } from "react";
import axios from "axios";
import shopBg from './shopc.jpg'; // Background image
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

export default function CreateShop() {
  const navigate = useNavigate();
  const [shop, setShop] = useState({
    name: "",
    owner: "",
    email: "",
    plan: "",
    paymentMethod: "",
    shopAddress: "",
    contactNumber: ""
  });
  const [file, setFile] = useState(null); // New state for image file
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(shop).forEach(key => formData.append(key, shop[key]));
      if (file) formData.append("img", file);

      const res = await axios.post(`${API_BASE_URL}/createshop`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.status === 200 && res.data.success) {
        document.cookie = "shopCreated=true; max-age=604800; path=/";
        setMessage("✅ Shop created successfully!");
        navigate("/");
      } else {
        setMessage(res.data.message || "Shop creation failed.");
      }
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message || "Shop creation failed.");
      } else {
        setMessage("Server error.");
      }
    }
  };

  return (
    <div
      style={{
        ...styles.bg,
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(${shopBg})`
      }}
    >
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Create Shop</h2> <br />

        <input type="text" name="name" placeholder="Shop Name" required onChange={handleChange} style={styles.input} />
        <input type="text" name="owner" placeholder="Owner Full Name" required onChange={handleChange} style={styles.input} />
        <input type="email" name="email" placeholder="Owner Email" required onChange={handleChange} style={styles.input} />
        <input type="text" name="contactNumber" placeholder="Contact Number" required onChange={handleChange} style={styles.input} />
        <input type="text" name="shopAddress" placeholder="Shop Address" required onChange={handleChange} style={styles.input} />

        {/* Replaced URL input with File input */}
        <input type="file" name="img" accept="image/*" required onChange={handleFileChange} style={styles.input} />

        <select name="plan" onChange={handleChange} required style={styles.input}>
          <option value="">Select Plan</option>
          <option value="1month">1 Month Plan</option>
          <option value="3month">3 Month Plan</option>
        </select>

        <select name="paymentMethod" onChange={handleChange} required style={styles.input}>
          <option value="">Payment Method</option>
          <option value="cash">Cash at Shop</option>
          <option value="online">Online Payment</option>
        </select>

        <button type="submit" style={styles.button}>Create Shop</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed"
  },
  form: {
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(6px)",
    padding: "30px",
    borderRadius: "15px",
    width: "100%",
    color: "black",
    maxWidth: "450px",
    boxShadow: "0 0 15px rgba(0,0,0,0.15)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  message: {
    marginTop: "12px",
  color: "red",  // show errors in red
  fontWeight: "bold",
  textAlign: "center"
  }
};
