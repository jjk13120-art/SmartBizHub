import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import a from './login.jpg';
import { API_BASE_URL } from "./config";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Optional: redirect if already logged in
    const email = document.cookie.split("; ").find(row => row.startsWith("email="));
    if (email) navigate("/profile");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/login`, form, {
        withCredentials: true,
      });

      if (res.status === 200 && res.data.success) {
        const { fullname, email, shopCreated } = res.data.user;
        document.cookie = `fullname=${encodeURIComponent(fullname)}; max-age=604800; path=/`;
        document.cookie = `email=${encodeURIComponent(email)}; max-age=604800; path=/`;
        if (shopCreated) {
          document.cookie = `shopCreated=true; max-age=604800; path=/`;
        }
        navigate("/");
      } else {
        setMessage(res.data.message || "Invalid email or password.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        ...styles.bg,
        backgroundImage: `url(${a})`,
      }}
    >
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={{ color: "black" }}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        {message && <p style={styles.error}>{message}</p>}
        <Link to="/form" style={styles.link}>Don't have an account? Sign up</Link>
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
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  },
  form: {
    background: "rgba(243, 239, 239, 0.2)",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    backdropFilter: "blur(6px)",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#7c3aed",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
    marginTop: "10px",
    transition: "transform 0.2s ease",
  },
  link: {
    display: "block",
    marginTop: "10px",
    color: "#3b82f6",
    textDecoration: "none",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};
