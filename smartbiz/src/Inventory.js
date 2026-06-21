import React, { useEffect, useState } from "react";
import "./Inventory.css";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [data, setData] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [cart, setCart] = useState([]);
  const [bill, setBill] = useState(null);
  const [qr, setQr] = useState(null);
  const [shopSearchTerm, setShopSearchTerm] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");
  

  // fetch user info (cookies)
  useEffect(() => {
    fetch("http://localhost:3001/mypurchases", { credentials: "include" })
      .then((res) => {
        if (res.status === 401) return null;
        return res.json();
      })
      .then((data) => {
        if (data && data.success) {
          const emailCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("email="));
          if (emailCookie) {
            setUserEmail(decodeURIComponent(emailCookie.split("=")[1]));
          }
        }
      })
      .catch(() => {});
  }, []);

  // fetch inventory data
  useEffect(() => {
    fetch("http://localhost:3001/inventory", { credentials: "include" })
      .then((res) => res.json())
      .then(setData)
      .catch((e) => console.error("Fetch error:", e));
  }, []);

  const openShopPopup = (shop) => {
    const products = data.productsByShop[shop.id] || [];
    setSelectedShop({ ...shop, products });
    setCart([]);
    setBill(null);
    setQr(null);
    setProductSearchTerm("");
  };

  const addToCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const handlePurchase = (method) => {
    if (!selectedShop || cart.length === 0) return;

    const body = cart.map((item) => ({
      shopId: selectedShop.id,
      productId: item.productId,
      quantity: item.quantity,
    }));

    fetch(`http://localhost:3001/purchase?method=${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setBill(res.purchases);

          if (method === "online" && res.qrImage) {
            setQr(res.qrImage);
          }

          if (method === "cash") {
            navigate(0);
            alert("Purchase successful!");
          }
        } else {
          alert(res.message);
        }
      });
  };

  if (!data) return <p>Loading inventory...</p>;

  return (
    <div className="inventory-container">
      <h2 className="inventory-title">Shops</h2>

      <input
        type="text"
        className="search-bar"
        placeholder="Search shops..."
        value={shopSearchTerm}
        onChange={(e) => setShopSearchTerm(e.target.value)}
      />

      <div className="shop-grid">
        {data.shopOwners
          .filter((shop) =>
            shop.name.toLowerCase().includes(shopSearchTerm.toLowerCase())
          )
          .map((shop) => (
            <div
              key={shop.id}
              className="shop-card"
              onClick={() => openShopPopup(shop)}
              style={{ cursor: "pointer" }}
            >
              <img src={shop.img} alt={shop.name} />
              <p>{shop.name}</p>
            </div>
          ))}
      </div>

      {selectedShop && (
        <div
          className="inventory-popup-overlay"
          onClick={() => setSelectedShop(null)}
        >
          <div
            className="inventory-popup"
            style={{ maxWidth: "800px" }} // widen popup for grid
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedShop(null)}
            >
              ×
            </button>
            <img
              className="shop-popup-image"
              src={selectedShop.img}
              alt={selectedShop.name}
            />
            <h3>{selectedShop.name}</h3>

  {userEmail === selectedShop.email && (
  <div
    style={{
      marginTop: "8px",
      display: "flex",
      gap: "10px",
      justifyContent: "center",
    }}
  >
    <button
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/addproducts/${selectedShop.id}`)}
    >
      Add Products
    </button>

    <button
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/deleteproducts/${selectedShop.id}`)}
    >
      Delete Products
    </button>

    <button
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        backgroundColor: "#ff9800",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/editproducts/${selectedShop.id}`)}
    >
      Edit Products
    </button>
  </div>
)}

            <input
              type="text"
              className="search-bar"
              placeholder="Search products..."
              value={productSearchTerm}
              onChange={(e) => setProductSearchTerm(e.target.value)}
            />

            <div className="products-grid">
              {selectedShop.products
                .filter((p) =>
                    p.name.toLowerCase().includes(productSearchTerm.toLowerCase())              )
                .map((p) => {
                  const item = cart.find((i) => i.productId === p.id);
                  const qty = item?.quantity || 0;

                  return (
                    <div key={p.id} className="product-card">
                      <a
                        href={`http://localhost:3001/media/${p.imgUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`http://localhost:3001/media/${p.imgUrl}`}
                          alt={p.name}
                        />
                      </a>

                      <h4>{p.name}</h4>
                      <p>₹{p.price}</p>

                      {qty > 0 ? (
                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              setCart((prev) =>
                                prev
                                  .map((i) =>
                                    i.productId === p.id
                                      ? {
                                          ...i,
                                          quantity: i.quantity - 1,
                                        }
                                      : i
                                  )
                                  .filter((i) => i.quantity > 0)
                              )
                            }
                          >
                            −
                          </button>
                         <span style={{ color: "black", fontWeight: "bold" }}>{qty}</span>
                          <button onClick={() => addToCart(p.id)}>+</button>
                        </div>
                      ) : (
                        <button
                          className="add-btn"
                          onClick={() => addToCart(p.id)}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>

            <button onClick={() => handlePurchase("cash")}>
              Cash on Delivery
            </button>
            <button
              onClick={() => handlePurchase("online")}
              style={{ background: "#0070f3" }}
            >
              Online Payment
            </button>

            {bill && (
              <div className="bill-box" style={{ color: "black" }}>
                <h4 style={{ color: "black" }}>🧾 Bill Summary</h4>
                <p>
                  <b>Bill No:</b> {bill.billNo}
                </p>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "black",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          borderBottom: "1px solid #ccc",
                          textAlign: "left",
                          color: "black",
                        }}
                      >
                        Product
                      </th>
                      <th
                        style={{
                          borderBottom: "1px solid #ccc",
                          color: "black",
                        }}
                      >
                        Qty
                      </th>
                      <th
                        style={{
                          borderBottom: "1px solid #ccc",
                          color: "black",
                        }}
                      >
                        Price
                      </th>
                      <th
                        style={{
                          borderBottom: "1px solid #ccc",
                          color: "black",
                        }}
                      >
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bill.products.map((p, idx) => (
                      <tr key={idx}>
                        <td style={{ color: "black" }}>{p.name}</td>
                        <td
                          style={{
                            textAlign: "center",
                            color: "black",
                          }}
                        >
                          {p.quantity}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            color: "black",
                          }}
                        >
                          ₹{p.price}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            color: "black",
                          }}
                        >
                          ₹{p.subtotal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p
                  style={{
                    textAlign: "right",
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  <b>Total (with GST):</b> ₹{bill.total}<br></br><br></br>
                  <b>(Delivery Charges Rs.50 included)</b>
                </p>
              </div>
            )}

            {qr && (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h4>Scan to Pay</h4>
                <img
                  src={qr}
                  alt="QR Code"
                  style={{ width: "180px" }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
