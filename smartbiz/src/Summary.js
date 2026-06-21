import React, { useEffect } from 'react';

export default function Summary() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const wrapperStyle = {
    margin: '120px auto',
    maxWidth: '1200px',
    padding: '20px',
    fontFamily: "'Segoe UI', sans-serif",
    background: 'linear-gradient(135deg, #f8f9ff, #eef2ff)',
    borderRadius: '20px'
  };

  const titleStyle = {
    fontSize: '36px',
    marginBottom: '40px',
    color: '#4b1fd5',
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: '1px',
    textShadow: '0 2px 8px rgba(91,45,213,0.2)',
    animation: 'fadeInDown 1s ease forwards'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  };

  const cardStyle = {
  background: 'rgba(255, 255, 255, 0.25)',
  borderRadius: '18px',
  padding: '25px',
  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
  color: '#222',
  lineHeight: '1.6',
  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  animation: 'fadeUp 1s ease forwards',
  cursor: 'default',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
};

  const headingStyle = {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#5c2dd5',
    fontWeight: '600'
  };

  const highlight = {
    color: '#4b1fd5',
    fontWeight: 'bold',
  };

  return (
    <>
      <style>
  {`
    @keyframes fadeUp {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInDown {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animated-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.7);
}

  `}
</style>


      <div style={wrapperStyle}>
        <h1 style={titleStyle}>📊 SmartBiz Hub Summary</h1>

        <div style={gridStyle}>
          {[
            {
              title: "✨ Key Features",
              content: (
                <ul>
                  <li>📅 Appointment scheduling</li>
                  <li>📄 PDF report generation</li>
                  <li>📧 Nodemailer email notifications</li>
                  <li>📥QR Code / UPI Payment</li>
                  <li>🔒 Role-based login</li>
                </ul>
              )
            },
            {
              title: "🛠 Tech Stack",
              content: (
                <ul>
                  <li><span style={highlight}>Frontend:</span> React</li>
                  <li><span style={highlight}>Backend:</span> Node.js, Express</li>
                  <li><span style={highlight}>DB:</span> MongoDB, Mongoose</li>
                  <li><span style={highlight}>Utilities:</span> Nodemailer</li>
                </ul>
              )
            },
            {
              title: "🔐 Roles",
              content: (
                <ul>
                  <li><b>Admin:</b> Full control, analytics</li>
                  <li><b>Staff:</b> Handles tasks & feedback</li>
                  <li><b>Client:</b> Book appointments, chat</li>
                </ul>
              )
            },
           {
  title: "📈 Regular Data Sync",
  content: (
    <p>
      Data is periodically synchronized with the server so that you always see the latest information.
    </p>
  )
}
,
            {
              title: "📦 Inventory Module",
              content: (
                <p>
                  Add products, track stock and generate inventory reports — all under one system.
                </p>
              )
            },
            {
              title: "📅 Appointments",
              content: (
                <p>
                  Users can book appointments, and admins/staff can manage them from a calendar dashboard.
                </p>
              )
            },
            {
              title: "🔮 Future Scope",
              content: (
                <ul>
                  <li>🌑 Dark mode</li>
                  <li>📱 PWA mobile app</li>
                  <li>💬 WhatsApp integration</li>
                  <li>🧠 AI-based recommendations</li>
                  <li>🌍 Multi-language interface</li>
                </ul>
              )
            },
            {
              title: "💬 Testimonials",
              content: (
                <blockquote style={{ fontStyle: 'italic', color: '#555' }}>
                  “SmartBiz Hub reduced client wait time by 60%.” — Clinic Owner <br />
                  “Real-time chat + alerts = game changer.” — Service Provider
                </blockquote>
              )
            },
            {
              title: "🚀 Conclusion",
              content: (
                <p>
                  SmartBiz Hub isn’t just software — it’s your business partner. Powerful, modular, and user-focused.
                </p>
              )
            },
          ].map((card, index) => (
            <div key={index} style={cardStyle} className="animated-card">
              <h2 style={headingStyle}>{card.title}</h2>
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
