import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    message: "",
    image: null
  });

  useEffect(() => {
    fetchFeedbacks();
    window.scroll(0,0);
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/get-feedbacks`);
      if (res.data.success) setFeedbacks(res.data.feedbacks);
    } catch (err) {
      console.error("Error loading feedbacks:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("message", form.message);
    if (form.image) {
      data.append("image", form.image);
    }

    try {
      await axios.post(`${API_BASE_URL}/submit-feedback`, data);
      setForm({ name: "", message: "", image: null });
      fetchFeedbacks();
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Segoe UI, Arial, sans-serif"
    }}>
      {/* Feedback List */}
<div
  style={{
    flex: 4,
    padding: "150px 60px",
    backgroundColor: "#f7fafd",
    overflowY: "auto"
  }}
>
  <h2
    style={{
      marginBottom: "30px",
      color: "#2c3e50",
      fontSize: "28px",
      fontWeight: "700"
    }}
  >
    💬 User Feedback
  </h2>

  {feedbacks.length === 0 ? (
    <p style={{ color: "#777", fontStyle: "italic" }}>No feedbacks yet.</p>
  ) : (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "25px"
      }}
    >
      {feedbacks.map((fb) => (
        <div
          key={fb._id || fb.id}
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
            transition: "transform 0.2s",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <h4
            style={{
              marginBottom: "6px",
              color: "#34495e",
              fontWeight: "600"
            }}
          >
            {fb.name}
          </h4>
          <p
            style={{
              marginBottom: "10px",
              color: "#555"
            }}
          >
            {fb.message}
          </p>
          {(fb.imageUrl || fb.img) && (
            <a
              href={`${API_BASE_URL}/${fb.imageUrl || fb.img}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${API_BASE_URL}/${fb.imageUrl || fb.img}`}
                alt="feedback"
                style={{
                  maxWidth: "100%",
                  maxHeight: "160px",
                  borderRadius: "6px",
                  objectFit: "cover",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </a>
          )}
          <p
            style={{
              fontSize: "12px",
              color: "#aaa",
              marginTop: "12px"
            }}
          >
            {fb.date ? new Date(fb.date).toLocaleString() : ""}
          </p>
        </div>
      ))}
    </div>
  )}
</div>


      {/* Feedback Form */}
<div style={{
  flex: 1,
  padding: "150px 30px",
  background: "linear-gradient(to bottom, #f0f9ff, #d6eaff)",
  borderLeft: "1px solid #d0e0f0",
  minHeight: "100vh"
}}>
  <h3 style={{
    marginBottom: "30px",
    textAlign: "center",
    color: "#1e3a8a",
    fontSize: "26px",
    fontWeight: "700"
  }}>Submit Feedback</h3>

  <form
    onSubmit={handleSubmit}
    encType="multipart/form-data"
    style={{
      display: "flex",
      flexDirection: "column",
      maxWidth: "500px",
      margin: "0 auto",
      background: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
    }}
  >
    <label style={{ marginBottom: "8px", fontWeight: "600", color: "#1f2937" }}>Name</label>
    <input
      type="text"
      name="name"
      value={form.name}
      onChange={handleInputChange}
      required
      placeholder="Your name"
      style={{
        padding: "12px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "16px"
      }}
    />

    <label style={{ marginBottom: "8px", fontWeight: "600", color: "#1f2937" }}>Message</label>
    <textarea
      name="message"
      value={form.message}
      onChange={handleInputChange}
      required
      rows="4"
      placeholder="Write your feedback..."
      style={{
        padding: "12px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "16px",
        resize: "vertical"
      }}
    ></textarea>

    <label style={{ marginBottom: "8px", fontWeight: "600", color: "#1f2937" }}>Image (optional)</label>
    <div style={{ position: "relative", marginBottom: "25px" }}>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleInputChange}
        style={{
          opacity: 0,
          width: "100%",
          height: "45px",
          position: "absolute",
          zIndex: 2,
          cursor: "pointer"
        }}
      />
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "45px",
        backgroundColor: "#e0f2fe",
        border: "2px dashed #38bdf8",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#0369a1",
        fontWeight: "600",
        pointerEvents: "none",
        zIndex: 1
      }}>
        Choose Image
      </div>
    </div><br/><br/>

    <button type="submit" style={{
      padding: "12px",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontWeight: "600",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background 0.3s ease"
    }}>
      Submit Feedback
    </button>
  </form>
</div>

    </div>
  );
}
