import React, { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on load
  }, []);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #f7f8fa, #e6e9f0)",
      fontFamily: "Segoe UI, sans-serif",
      padding: "120px",
    }}>
      <div style={{
        maxWidth: "800px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "2.5rem",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
        overflowY: "auto",
        maxHeight: "90vh",
        borderLeft: "8px solid #5a62f2"
      }}>
        <h1 style={{ color: "#5a62f2", fontSize: "2rem", marginBottom: "1rem" }}>Privacy Policy</h1>
        <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "#333" }}>
          Your privacy is important to us. It is <strong style={{color: "#5a62f2"}}>Smartbiz Hub's</strong> policy to respect your privacy regarding any information we may collect from you across our platform.
        </p>

        <h2 style={{ marginTop: "1.5rem", color: "#444" }}>Information Collection</h2>
        <p style={{ lineHeight: "1.6",color:"black"}}>
          We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. 
        </p>

        <h2 style={{ marginTop: "1.5rem", color: "#444" }}>Data Usage</h2>
        <ul style={{ lineHeight: "1.8", paddingLeft: "1.5rem",color:"black" }}>
          <li>To provide and maintain our services</li>
          <li>To notify you about changes to our service</li>
          <li>To provide customer support</li>
          <li>To monitor usage and improve our platform</li>
        </ul>

        <h2 style={{ marginTop: "1.5rem", color: "#444" }}>Information Sharing</h2>
        <p style={{color:"black"}}>
          We do not share personally identifying information publicly or with third parties, except when required to by law. We protect your data within commercially acceptable means to prevent loss and theft.
        </p>

        <h2 style={{ marginTop: "1.5rem", color: "#444" }}>Your Rights</h2>
        <p style={{color:"black"}}>
          You are free to refuse our request for your personal information, with the understanding that we may be unable to provide some of your desired services.
        </p>

        <h2 style={{ marginTop: "1.5rem", color: "#444" }}>Policy Updates</h2>
        <p style={{color:"black"}}>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>

        <h2 style={{ marginTop: "1.5rem", color: "#444" }}>Contact Us</h2>
        <p style={{color:"black"}}>
          If you have any questions or concerns about our Privacy Policy, feel free to contact us at <a href="mailto:privacy@smartbizhub.com" style={{ color: "#5a62f2", textDecoration: "none" }}>privacy@smartbizhub.com</a>.
        </p>

        <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#777" }}>
          Last updated: August 6, 2025
        </p>
      </div>
    </div>
  );
}
