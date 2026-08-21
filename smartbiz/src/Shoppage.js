// src/ShopPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ShopPage.css";
import { API_BASE_URL } from "./config";

export default function ShopPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [cart, setCart] = useState({});
  const [bill, setBill] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/inventory`, { credentials: "include" })
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load inventory:", err));
  }, []);

  const getEmail = () => {
    const match = document.cookie.match(/(^| )email=([^;]+)/);
    return match ? match[2] : null;
  };

  const addToCart = (shopId, product) => {
    const key = `${shopId}_${product.id}`;
    setCart(prev => ({
      ...prev,
      [key]: { shopId, product, quantity: (prev[key]?.quantity || 0) + 1 }
    }));
  };

  const purchaseAll = async () => {
    const email = getEmail();
    if (!email) {
      alert("Please sign up to purchase.");
      navigate("/form");
      return;
    }

    const items = Object.values(cart).map(item => ({
      shopId: item.shopId,
      productId: item.product.id,
      quantity: item.quantity
    }));
    if (items.length === 0) return alert("Cart is empty!");

    try {
      const res = await fetch(`${API_BASE_URL}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(items)
      });

      const result = await res.json();
      if (result.success) {
        setBill(result.purchases);
        setCart({});
      } else {
        alert(result.message || "Purchase failed.");
      }
    } catch (err) {
      console.error("Purchase error:", err);
      alert("Something went wrong.");
    }
  };

  if (!data) return <p>Loading shop...</p>;

  const shop = data.shopOwners.find(s => s.id === parseInt(id));
  const products = data.productsByShop[id] || [];

  return (
     <div className="shop-page-container">
    <img
      src={shop?.img}
      alt={shop?.name}
      className="shop-image"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/fallback.png";
      }}
    />
    <h2>{shop?.name}</h2>

      <div className="product-list">
        {products.map(prod => (
          <div key={prod.id} className="product-card">
           <img
  src={`${API_BASE_URL}/media/${prod.imgUrl}`}
  alt={prod.name}
  className="product-image"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/fallback.png"; // Optional fallback
  }}
/>
            <span>{prod.name}</span>
            <span>₹{prod.price}</span> <br></br>
            <button onClick={() => addToCart(shop.id, prod)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h4>Your Cart</h4>
      <ul>
        {Object.values(cart)
          .filter(item => item.shopId === shop.id)
          .map(item => (
            <li key={item.product.id}>
              {item.product.name} × {item.quantity}
            </li>
          ))}
      </ul>

      <button onClick={purchaseAll} className="purchase-btn">Purchase</button>

      {bill && (
        <div className="bill-box" style={{ color: "black", marginTop: "20px" }}>
          <h4>🧾 Bill Summary</h4>
          <p><b>Bill No:</b> {bill.billNo}</p>
          <table style={{ width: "100%", borderCollapse: "collapse", color: "black" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Product</th>
                <th style={{ borderBottom: "1px solid #ccc" }}>Qty</th>
                <th style={{ borderBottom: "1px solid #ccc" }}>Price</th>
                <th style={{ borderBottom: "1px solid #ccc" }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {bill.products.map((p, idx) => (
                <tr key={idx}>
                  <td>{p.name}</td>
                  <td style={{ textAlign: "center" }}>{p.quantity}</td>
                  <td style={{ textAlign: "center" }}>₹{p.price}</td>
                  <td style={{ textAlign: "center" }}>₹{p.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ textAlign: "right", marginTop: "10px" }}>
            <b>Total (with GST):</b> ₹{bill.total}<br />
            <b>(Delivery Charges Rs.50 included)</b>
          </p>
        </div>
      )}
    </div>
  );
}
