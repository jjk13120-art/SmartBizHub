import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  page: {
    fontFamily: 'Segoe UI, sans-serif',
    background: '#f8f9fa',
    padding: '140px 20px',
    textAlign: 'center',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'purple',
  },
  subtext: {
    fontSize: '16px',
    marginBottom: '30px',
    color: '#555',
  },
  pricingContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '20px',
  },
  card: {
    background: 'linear-gradient(135deg, #343a40, #6c757d)',
    borderRadius: '16px',
    padding: '30px',
    width: '300px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    position: 'relative',
    transition: 'transform 0.3s ease',
    color: 'white',
    textAlign: 'left',
  },
  cardPro: {
    background: 'linear-gradient(135deg, #6f42c1, #9b59b6)',
  },
  cardEnterprise: {
    background: 'linear-gradient(135deg, #343a40, #6c757d)',
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  price: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '15px 0',
  },
  featureList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    fontSize: '15px',
    lineHeight: '1.6',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    textDecoration: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'inline-block',
  },
};

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Choose Your Plan</h1>
      <p style={styles.subtext}>
        Explore our flexible plans designed to grow your business with features tailored to your needs.
      </p>

      <div style={styles.pricingContainer}>
        {/* Basic Plan */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Basic Plan</h2>
          <p>Ideal for small businesses starting out</p>
          <div style={styles.price}>₹1299/month</div>
          <ul style={styles.featureList}>
            <li>Basic inventory management</li>
            <li>Email support</li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div style={{ ...styles.card, ...styles.cardPro }}>
          <h2 style={styles.cardTitle}>Pro Plan</h2>
          <p>Perfect for growing businesses</p>
          <div style={styles.price}>₹2599/month</div>
          <ul style={styles.featureList}>
            <li>Add shops (more than 1) up to 4 in this plan</li>
            <li>Advanced inventory & analytics</li>
            <li>Priority email and chat support</li>
          </ul>
        </div>

        {/* Enterprise Plan */}
        <div style={{ ...styles.card, ...styles.cardEnterprise }}>
          <h2 style={styles.cardTitle}>Enterprise Plan</h2>
          <p>Customized for large organizations</p>
          <div style={styles.price}>Contact us</div>
          <ul style={styles.featureList}>
            <li>Unlimited shops</li>
            <li>Custom integrations</li>
            <li>Dedicated account manager</li>
          </ul>
          <Link to="/contact" style={styles.button}>Contact Sales</Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
