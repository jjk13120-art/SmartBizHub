// src/AuthWrapper.js
import React, { useState } from "react";
import Signup from "./Form";     // Make sure this is your signup component
import Login from "./Login";     // And this is your login component

export default function AuthWrapper() {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => setIsLogin(prev => !prev);

  return (
    <>
      <style>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to right, #4facfe, #00f2fe);
          font-family: 'Segoe UI', sans-serif;
        }

        .flip-card {
          background: transparent;
          width: 400px;
          height: 460px;
          perspective: 1000px;
        }

        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s ease-in-out;
          transform-style: preserve-3d;
        }

        .flip-inner.flipped {
          transform: rotateY(180deg);
        }

        .flip-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          background: white;
          border-radius: 10px;
          padding: 2rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .flip-front {
          z-index: 2;
        }

        .flip-back {
          transform: rotateY(180deg);
        }

        .switch-link {
          text-align: center;
          font-size: 0.95rem;
          color: #333;
        }

        .switch-link span {
          color: #007bff;
          cursor: pointer;
          font-weight: bold;
          transition: color 0.3s;
        }

        .switch-link span:hover {
          color: #0056b3;
        }
      `}</style>

      <div className="auth-container">
        <div className="flip-card">
          <div className={`flip-inner ${isLogin ? "flipped" : ""}`}>
            <div className="flip-face flip-front">
              <Signup />
              <div className="switch-link">
                Already have an account? <span onClick={toggleForm}>Login</span>
              </div>
            </div>
            <div className="flip-face flip-back">
              <Login />
              <div className="switch-link">
                Don’t have an account? <span onClick={toggleForm}>Sign up</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
