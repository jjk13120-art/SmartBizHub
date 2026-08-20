import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

export default function EditProducts() {
  const { id } = useParams(); // shopId
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", image: null });

  useEffect(() => {
    fetch(`${API_BASE_URL}/inventory`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.productsByShop[id]) {
          setProducts(data.productsByShop[id]);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, price: product.price, image: null });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price);
    if (formData.image) form.append("image", formData.image);

    fetch(`${API_BASE_URL}/edit-product/${id}/${editingProduct.id}`, {
      method: "PUT",
      body: form,
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Product updated");
          setProducts(prev =>
            prev.map(p => (p.id === editingProduct.id ? { ...p, ...data.product } : p))
          );
          setEditingProduct(null);
        } else {
          alert(data.message || "Failed to update");
        }
      })
      .catch(err => alert("Error updating product"));
  };

  return (
    <div style={{ padding: "120px",color:"black"}}>
      <h2>Edit Products</h2><br/>
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

      {editingProduct ? (
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
          <h3>Edit {editingProduct.name}</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product name"
            required
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            style={{ margin: "10px 0" }}
          />
          <button
            type="submit"
            style={{
              background: "green",
              color: "white",
              padding: "8px 12px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </form>
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
                src={`${API_BASE_URL}/media/${p.imgUrl}`}
                alt={p.name}
                style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }}
              />
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
              <button
                style={{
                  background: "orange",
                  color: "white",
                  padding: "6px 10px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => startEdit(p)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
