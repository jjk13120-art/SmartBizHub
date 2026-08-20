import React, { useRef, useEffect, useState } from "react";
import homepageImage from "./homepage.webp";
import secondPageImage from "./secondpage.jpg";
import logo from "./logo.png";
import "./App.css";
import { API_BASE_URL } from "./config";

export function Home() {
  const aboutRef = useRef(null);
  const topRef = useRef(null);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hasCreatedShop, setHasCreatedShop] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // --- Helper: Show toast ---
  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Get cookies
  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
  };

  useEffect(() => {
    const emailCookie = getCookie("email");
    const shopCreatedCookie = getCookie("shopCreated");
    setIsSignedIn(!!emailCookie);
    setHasCreatedShop(shopCreatedCookie === "true");
  }, []);

  const handleCreateShop = () => {
    if (!isSignedIn) {
      showToast("Please sign up first to create a shop.", "error");
      window.location.href = "/form";
      return;
    }
    window.location.href = "/createshop";
  };

  // ---- NEW FUNCTIONS FOR APPOINTMENTS ----
  const handleOfflineAppointment = async () => {
    if (!isSignedIn) {
      showToast("Please login to book an appointment.", "error");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/offline-appointment`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message, "success");
      } else {
        showToast(data.message || "Failed to book appointment", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error booking offline appointment", "error");
    }
  };

  const handleOnlineAppointment = () => {
    if (!isSignedIn) {
      showToast("Please login to book an appointment.", "error");
      window.location.href = "/login";
      return;
    }
    window.location.href = "/contact";
  };
  
useEffect(() => {
  // Scroll smoothly to top after short delay
 const scrollToTop = () => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Use requestAnimationFrame for smoother effect
  requestAnimationFrame(() => {
    setTimeout(scrollToTop, 100);
  });

  // Smooth scrolling setup
  window.scrollToAboutUs = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  window.scrollToHomeTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // Heading animation
  const heading = "Smart-biz  Hub";
  const words = heading.split("");
  const container = document.getElementById("animated-heading");
  if (container) {
    container.innerHTML = "";
    words.forEach((char, index) => {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = char;
      span.style.animationDelay = `${index * 0.1}s`;
      container.appendChild(span);
    });
  }

  // Scroll animation
  const handleScroll = () => {
    const section = document.querySelector(".feature-section");
    if (
      section &&
      section.getBoundingClientRect().top < window.innerHeight - 100
    ) {
      section.classList.add("visible");
    }
  };

  // Counter animation
  let count = 1980;
  const maxCount = 2153;
  const pTag = document.getElementById("subscribe-text");
  const interval = setInterval(() => {
    if (pTag) pTag.innerText = `Subscribers count: ${count}`;
    if (count >= maxCount) clearInterval(interval);
    count++;
  }, 20);

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
    clearInterval(interval);
  };
}, []);

  return (
    <>
      {/* Toast notification */}
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "12px 20px",
            backgroundColor:
              toast.type === "success"
                ? "#4CAF50"
                : toast.type === "error"
                ? "#f44336"
                : "#333",
            color: "white",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 9999,
            fontSize: "16px",
          }}
        >
          {toast.message}
        </div>
      )}

      <section
        className="background-zoom-section"
        ref={topRef}
        style={{
          position: "relative",
          color: "white",
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "800px" }}>
          <div className="hero-left">
            <h3 className="gradient-text">|</h3>
           <h3
  id="animated-heading"
  className="gradient-text"
  aria-label="Smart-biz Hub animated heading"
>
  <span style={{
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    border: 0,
  }}>
    Smart-biz Hub
  </span>
</h3>


            <h3 className="gradient-text">|</h3>
            <h1>
              Run your business
              <br />
              <em>smarter</em> with Smartbiz Hub
            </h1>
            <p>
              Smartbiz Hub is the all-in-one platform your business needs to
              streamline operations, manage clients, and grow revenue. Sign up
              today and experience the future of business management.
            </p>

            {!isSignedIn && (
              <div className="email-signup" style={{ marginTop: "20px" }}>
                <button onClick={() => (window.location.href = "/form")}>
                  Sign up
                </button>
                <button onClick={() => (window.location.href = "/login")}>
                  Login
                </button>
              </div>
            )}

            {isSignedIn && !hasCreatedShop && (
              <div className="email-signup" style={{ marginTop: "20px" }}>
                <button onClick={handleCreateShop}>Create Shop</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="logo1">
        <img
          src={logo}
          alt="SmartBiz Hub Logo"
          style={{
            width: "180px",
            marginBottom: "20px",
            zIndex: 5,
            position: "relative",
            filter: "drop-shadow(0px 0px 8px white)",
          }}
        />
      </div>

      <section className="hero">
        <div className="hero-left">
          <h1 style={{ fontSize: "2.8rem", marginBottom: "20px" }}>
            Why Smartbiz Hub is Trusted?
          </h1>
          <p style={{ fontSize: "1.2rem" }}>
            Thousands of businesses across industries trust Smartbiz Hub for
            their operations. With real-time analytics, client handling,
            appointment management, and inventory tracking — all in one place —
            Smartbiz Hub empowers you to focus on growth.
          </p>
        </div>
        <div className="hero-right">
          <img src={homepageImage} alt="Team collaboration" />
        </div>
      </section>

      <section className="hero1" id="aboutus" ref={aboutRef}>
        <div className="feature-section">
          <div className="feature-text">
            <h2>
              Effortless Appointment Scheduling with{" "}
              <em>
                Smartbiz <span>Hub</span>
              </em>
            </h2>
            <p>
              Never miss a booking again. Our appointment scheduling system is
              designed to streamline your scheduling process, reduce no-shows,
              and keep your business running smoothly. Manage your appointments
              with ease.
            </p>
            <ul>
              <li style={{ color: "black" }}>
                📅 <strong>Online Booking:</strong> Book 24/7
              </li>
              <li style={{ color: "black" }}>
                📅 <strong>Reminders:</strong> Get SMS/email alerts
              </li>
              <li style={{ color: "black" }}>
                📅 <strong>Calendar Sync:</strong> Connect to Google/Outlook
              </li>
            </ul>

            {/* ---- Appointment Buttons ---- */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "15px",
              }}
            >
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={handleOfflineAppointment}
              >
                Offline Appointment
              </button>

              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={handleOnlineAppointment}
              >
                Online Appointment
              </button>
            </div>
          </div>
          <div className="hero-right">
            <img
              src={secondPageImage}
              alt="Appointment Scheduler"
              style={{ height: "100%" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
