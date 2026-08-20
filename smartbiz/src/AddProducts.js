import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import addproBg from "./addpro.jpg"; // ✅ Import image from src folder
import { API_BASE_URL } from "./config";

export default function AddProducts() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on component load
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("shopId", shopId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const res = await fetch(`${API_BASE_URL}/upload-product-img`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Product added successfully!");
        navigate("/inventory");
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error uploading product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${addproBg})`, // ✅ Use imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          width: "100%",
          maxWidth: "450px",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
          Add Product
          <br />
          <span style={{ fontSize: "14px", color: "#666" }}>
            Shop ID: {shopId}
          </span>
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            style={{ ...inputStyle, padding: "8px" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#888" : "#10b981",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "15px",
  outline: "none",
};
