export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname.includes("github.io")
    ? "https://smartbiz-backend1.onrender.com"
    : "http://localhost:3001");

