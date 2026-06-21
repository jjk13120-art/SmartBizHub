import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteProducts() {
  const { id } = useParams(); // shopId from route
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    // Fetch inventory and filter products for this shop
    fetch("http://localhost:3001/inventory", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.productsByShop[id]) {
          setProducts(data.productsByShop[id]);
          const shop = data.shopOwners.find((s) => s.id === Number(id));
          if (shop) setShopName(shop.name);
        }
      })
      .catch((err) => console.error("Error loading products:", err));
  }, [id]);

  const handleDelete = (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    fetch(`http://localhost:3001/delete-product/${id}/${productId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert("Product deleted!");
          setProducts((prev) => prev.filter((p) => p.id !== productId));
        } else {
          alert(res.message || "Failed to delete product");
        }
      })
      .catch(() => alert("Error deleting product"));
  };

  return (
    <div style={{ padding: "120px", color:"black" }}>
      <h2>Delete Products - {shopName}</h2><br/>
      <button
        style={{
          background: "#0070f3",
          color: "white",
          padding: "6px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "16px",
        }}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {products.length === 0 ? (
        <p>No products found for this shop.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <img
                src={`http://localhost:3001/media/${p.imgUrl}`}
                alt={p.name}
                style={{ width: "100%", maxHeight: "150px", objectFit: "cover"  }}
              />
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
              <button
                style={{
                  background: "red",
                  color: "white",
                  padding: "6px 10px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
