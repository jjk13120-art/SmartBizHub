import React, { useState, useEffect, useRef } from "react";

export default function Aichat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const smartBizReply = (question) => {
    const q = question.toLowerCase();
    const replies = [];

    if (q.includes("hello") || q.includes("hi") || q.includes("hey"))
      replies.push("Hi! I'm your SmartBiz Hub chatbot. Ask me anything about SmartBiz Hub.");
    if (q.includes("your name") || q.includes("who are you"))
      replies.push("I am the SmartBiz Hub AI assistant created to guide and support you.");
    if (q.includes("jai siyaram") || q.includes("jai shri ram"))
      replies.push("🙏 Jai Siyaram! Wishing success for your SmartBiz Hub journey.");

    if (q.includes("what is smartbiz") || q.includes("about smartbiz"))
      replies.push("SmartBiz Hub is a platform that allows you to manage shops, inventory, customers, payments, queues, and feedback in one place.");
    if (q.includes("mission"))
      replies.push("Our mission: simplify small business operations with modern digital tools.");
    if (q.includes("vision"))
      replies.push("Vision: bring enterprise-grade technology to every small and medium business.");
    if (q.includes("who can use smartbiz"))
      replies.push("Anyone managing a business: retail shops, clinics, salons, gyms, coaching centers, cafés, etc.");

    if (q.includes("why smartbiz") || q.includes("benefit") || q.includes("advantage"))
      replies.push("Benefits: automate work, track everything, manage payments, gain insights, and serve customers better.");
    if (q.includes("disadvantage") || q.includes("limitations"))
      replies.push("Limitations: Only English language currently, dark mode is in development, and offline features are partially limited.");

    if (q.includes("features") || q.includes("functions") || q.includes("modules"))
      replies.push("Features: shop creation, appointment booking, queue management, inventory, billing, UPI QR payments, PDF reports, real-time chat, feedback collection, analytics dashboard.");
    if (q.includes("analytics") || q.includes("dashboard"))
      replies.push("Dashboard shows insights: sales, customer visits, appointment stats, and inventory levels.");
    if (q.includes("report") || q.includes("pdf"))
      replies.push("SmartBiz Hub automatically generates PDF bills and summary reports with QR codes.");
    if (q.includes("calendar"))
      replies.push("You can see all bookings and appointments on a visual calendar.");
    if (q.includes("email"))
      replies.push("The platform sends important alerts and confirmations via email.");
    if (q.includes("real time") || q.includes("live"))
      replies.push("SmartBiz Hub works in real-time for chats, feedback, and queue updates.");

    if (q.includes("create shop"))
      replies.push("Click 'Create Shop' after signing in. Free: 1 shop, Basic: 4 shops, Premium: unlimited.");
    if (q.includes("edit shop") || q.includes("update shop"))
      replies.push("Shop details can be edited anytime from your dashboard.");
    if (q.includes("shop limit"))
      replies.push("Shop limits: Free 1 shop, Basic 4 shops, Premium unlimited.");
    if (q.includes("delete shop"))
      replies.push("Currently, deleting a shop is available only via admin request for data safety.");

    if (q.includes("inventory") || q.includes("products"))
      replies.push("Manage inventory: add products with images, set prices, and track stock in real-time.");
    if (q.includes("add product"))
      replies.push("Go to Dashboard > Inventory > Add Product. Fill in name, price, and upload image.");
    if (q.includes("update product") || q.includes("edit product"))
      replies.push("Select a product from inventory and edit its details easily.");
    if (q.includes("delete product"))
      replies.push("Select a product from inventory and click delete to remove it.");
    if (q.includes("low stock") || q.includes("stock alert"))
      replies.push("Low stock notifications appear on your dashboard automatically.");

    if (q.includes("bill") || q.includes("receipt"))
      replies.push("PDF bills with QR UPI payment support are automatically created for every transaction.");
    if (q.includes("payment"))
      replies.push("Supports UPI QR payments and cash payments.");
    if (q.includes("qr"))
      replies.push("QR codes are used for customer check-ins and UPI payments.");
    if (q.includes("upi"))
      replies.push("UPI payments are seamless: just scan and pay.");

    if (q.includes("queue") || q.includes("token"))
      replies.push("Queue management generates tokens, tracks average wait time, and updates customers in real-time.");

    if (q.includes("appointment") || q.includes("booking"))
      replies.push("SmartBiz Hub lets customers book appointments online, and admins can manage them from the dashboard.");
    if (q.includes("cancel appointment"))
      replies.push("Admins and staff can cancel or reschedule appointments from the dashboard.");

    if (q.includes("feedback"))
      replies.push("You can collect voice and text feedback from customers and see trends.");
    if (q.includes("chat"))
      replies.push("Real-time chat between staff and customers is supported.");

    if (q.includes("pricing") || q.includes("subscription"))
      replies.push("Plans: Free (basic features), Basic (4 shops, full tools), Premium (unlimited shops, analytics).");
    if (q.includes("upgrade") || q.includes("plan"))
      replies.push("Upgrade plans from Dashboard > Subscription.");
    if (q.includes("trial"))
      replies.push("The free plan acts as your trial. Upgrade anytime.");
    if (q.includes("cancel plan"))
      replies.push("Plans can be canceled anytime from subscription settings.");

    if (q.includes("notifications"))
      replies.push("Notifications: email alerts, dashboard notifications, and live updates.");
    if (q.includes("reminder"))
      replies.push("Appointment reminders are automatically sent to customers via email.");

    if (q.includes("tech stack"))
      replies.push("Tech: React, Node.js, MongoDB, Express, Tailwind, WebSockets.");
    if (q.includes("security"))
      replies.push("We ensure security with hashed passwords, role-based permissions, and verified endpoints.");
    if (q.includes("data"))
      replies.push("All data is stored securely in MongoDB. Backups are taken regularly.");

    if (q.includes("future") || q.includes("roadmap"))
      replies.push("Upcoming features: dark mode, AI-based suggestions, WhatsApp integration, and mobile app.");
    if (q.includes("mobile app"))
      replies.push("Mobile app version is under development and will be launched soon.");
    if (q.includes("language"))
      replies.push("Currently English only. Multi-language support coming soon.");

    if (q.includes("support") || q.includes("help"))
      replies.push("For help, email us or check the help section in your dashboard.");
    if (q.includes("contact"))
      replies.push("Contact: Use the support email shown in the dashboard footer.");

    if (replies.length === 0)
      return "I can answer SmartBiz Hub questions: shops, appointments, inventory, billing, payments, QR, feedback, dashboard, or plans. Try asking about one of these!";

    return replies.map((reply, index) => `${index + 1}. ${reply}`).join("\n");
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const botMsg = { role: "assistant", content: smartBizReply(currentInput) };
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, Math.random() * 800 + 400);
  };

  const handleSuggestionClick = (text) => {
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      const botMsg = { role: "assistant", content: smartBizReply(text) };
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, Math.random() * 800 + 400);
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const suggestions = [
    "What is SmartBiz Hub?",
    "How do I create a shop?",
    "Show me the pricing plans",
    "How to manage shop inventory?"
  ];

  return (
    <div style={styles.page}>
      {/* Background blobs for liquid glass effect */}
      <div className="liquid-blob-1"></div>
      <div className="liquid-blob-2"></div>
      <div className="liquid-blob-3"></div>

      <div style={styles.wrapper}>
        {/* Header section with pulsating online status */}
        <div style={styles.header}>
          <div style={styles.titleArea}>
            <div style={styles.avatar}>🤖</div>
            <div>
              <h2 style={styles.title}>SmartBiz Assistant</h2>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Local Rule-based Chat</span>
            </div>
          </div>
          <div style={styles.statusIndicator}>
            <div className="status-dot-pulse" style={styles.statusDot}></div>
            Online
          </div>
        </div>

        {/* Chat area */}
        <div style={styles.chatBox} ref={chatBoxRef}>
          {messages.length === 0 && (
            <div style={{ textAlign: "center", margin: "auto", padding: "20px", color: "rgba(255,255,255,0.4)" }}>
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>💬</div>
              <h4 style={{ color: "#ffffff", fontWeight: "600" }}>Welcome to SmartBiz Hub Support!</h4>
              <p style={{ fontSize: "14px", maxWidth: "400px", margin: "0 auto", color: "rgba(255,255,255,0.6)" }}>
                Ask me any questions about setting up your shop, pricing plans, billing, or managing products.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              style={msg.role === "user" ? styles.userBubble : styles.botBubble}
            >
              <div style={styles.sender}>
                {msg.role === "user" ? "You" : "Assistant"}
              </div>
              <div style={styles.messageText}>
                {msg.content.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          ))}

          {loading && (
            <div style={styles.botBubble}>
              <div style={styles.sender}>Assistant</div>
              <div style={{ display: "flex", gap: "4px", padding: "4px 0" }}>
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions chips */}
        <div style={styles.suggestionsArea}>
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(s)}
              className="suggestion-chip"
              style={styles.suggestionChip}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div style={{
          ...styles.inputArea,
          ...(isFocused ? { borderColor: "rgba(99, 102, 241, 0.6)", boxShadow: "0 0 15px rgba(99, 102, 241, 0.2)" } : {})
        }}>
          <input
            type="text"
            value={input}
            placeholder="Type a message..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={styles.input}
          />
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={sendMessage}
            style={{
              ...styles.button,
              transform: isHovered ? "translateY(-1px)" : "none",
            }}
          >
            Send ➜
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

        .dot { animation: blink 1.5s infinite; color: rgba(255, 255, 255, 0.7); font-weight: bold; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink {
          0%, 20% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Modern scrollbar only for chatBox */
        div[style*="overflow-y: auto"]::-webkit-scrollbar {
          width: 6px;
        }
        div[style*="overflow-y: auto"]::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }
        div[style*="overflow-y: auto"]::-webkit-scrollbar-track {
          background: transparent;
        }

        .suggestion-chip:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
          color: #fff !important;
          transform: translateY(-1px);
        }

        .suggestion-chip:active {
          transform: translateY(0);
        }

        @keyframes float-blob-1 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -60px) scale(1.2); }
          66% { transform: translate(-30px, 40px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes float-blob-2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, 50px) scale(1.15); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes float-blob-3 {
          0% { transform: translate(0, 0) scale(1.1); }
          40% { transform: translate(40px, 40px) scale(0.95); }
          80% { transform: translate(-20px, -30px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1.1); }
        }

        .liquid-blob-1 {
          position: absolute;
          top: 15%;
          left: 20%;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0) 70%);
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          animation: float-blob-1 18s infinite ease-in-out;
          pointer-events: none;
        }

        .liquid-blob-2 {
          position: absolute;
          bottom: 15%;
          right: 20%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(59, 130, 246, 0) 70%);
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          animation: float-blob-2 22s infinite ease-in-out;
          pointer-events: none;
        }

        .liquid-blob-3 {
          position: absolute;
          bottom: 40%;
          left: 35%;
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0) 70%);
          border-radius: 50%;
          filter: blur(70px);
          z-index: 0;
          animation: float-blob-3 15s infinite ease-in-out;
          pointer-events: none;
        }

        @keyframes slideInUser {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideInBot {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulseStatus {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        .status-dot-pulse {
          animation: pulseStatus 2s infinite;
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#080612",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "120px 20px 40px 20px",
    fontFamily: "'Outfit', 'Inter', 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  wrapper: {
    width: "600px",
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    zIndex: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    paddingBottom: "16px",
  },
  titleArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "-0.5px",
    lineHeight: "1.2",
  },
  statusIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(16, 185, 129, 0.1)",
    border: "1px solid rgba(16, 185, 129, 0.2)",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    color: "#10b981",
    fontWeight: "600",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#10b981",
  },
  chatBox: {
    height: "350px",
    overflowY: "auto",
    paddingRight: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    scrollBehavior: "smooth",
  },
  userBubble: {
    alignSelf: "flex-end",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "18px 18px 0 18px",
    maxWidth: "75%",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.2)",
    animation: "slideInUser 0.3s ease-out forwards",
  },
  botBubble: {
    alignSelf: "flex-start",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    color: "#e2e8f0",
    padding: "12px 16px",
    borderRadius: "18px 18px 18px 0",
    maxWidth: "75%",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
    animation: "slideInBot 0.3s ease-out forwards",
  },
  sender: {
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "4px",
    color: "rgba(255, 255, 255, 0.4)",
  },
  messageText: {
    whiteSpace: "pre-wrap",
    lineHeight: "1.5",
    fontSize: "14px",
  },
  suggestionsArea: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "0 4px",
  },
  suggestionChip: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "20px",
    padding: "8px 14px",
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.7)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    outline: "none",
  },
  inputArea: {
    display: "flex",
    gap: "12px",
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    padding: "6px 6px 6px 16px",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "15px",
    padding: "10px 0",
  },
  button: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s ease",
    outline: "none",
  },
};
