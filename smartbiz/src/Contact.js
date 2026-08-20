import React,{useEffect} from 'react';
import locationIcon from './location-pin.png';
import emailIcon from './gmail.png';
import phoneIcon from './incoming-call.png';
import whatsappIcon from './logo copy.png';

const styles = {
  page: {
    fontFamily: 'Segoe UI, sans-serif',
   background: "linear-gradient(135deg, #e0f7fa, #b2ebf2, #80deea)",
    padding: '100px 20px 40px',
    color: '#222',
    textAlign: 'center',
    minHeight: '100vh',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: 'black',
  },
  section: {
    maxWidth: '700px',
    backgroundColor: '#fff',
    margin: '0 auto 40px auto',
    padding: '30px 40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#5f3cf0',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '15px',
    fontSize: '18px',
  },
  icon: {
    width: '28px',
    height: '28px',
  },
  iframe: {
    border: 'none',
    width: '100%',
    maxWidth: '700px',
    height: '350px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    margin: '0 auto',
    display: 'block',
  },
};

const ContactPage = () => {
  useEffect(() => {
  window.scrollTo(0, 0); // Force scroll to top when the component mounts
}, []);
  return (
    <div style={styles.page}>
     <u> <h1 style={styles.title}>Contact Us</h1></u>
      <div style={styles.section}>
        <h2 style={styles.heading}>Get in Touch</h2>

        <div style={styles.item}>
          <img src={locationIcon} alt="Location" style={styles.icon} />
          <a href="https://maps.app.goo.gl/ka7ZikZt44hbzE1V6" target="_blank" rel="noopener noreferrer">
            LJ University, Sarkhej - Gandhinagar Hwy, Ahmedabad
          </a>
        </div>

        <div style={styles.item}>
          <img src={emailIcon} alt="Email" style={styles.icon} />
          <a href="mailto:supportsmartbiz@gmail.com">supportsmartbiz@gmail.com</a>
        </div>

        <div style={styles.item}>
          <img src={phoneIcon} alt="Phone" style={styles.icon} />
          <a href="tel:+919427028964">+91 9427028964</a> <p>(Contach us for offline appointments)</p>
        </div>

        <div style={styles.item}>
          <img src={whatsappIcon} alt="WhatsApp" style={styles.icon} />
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
        </div>
      </div>

      <u><h1 style={styles.title}>Location</h1></u>
      <iframe
        title="Google Map Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.9708608721785!2d72.49029207509072!3d22.988098979198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b0f57f45edf%3A0x371e4963c483ec2d!2sLJ%20UNIVERSITY!5e0!3m2!1sen!2sin!4v1748189396994!5m2!1sen!2sin"
        style={styles.iframe}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>  
  );
};

export default ContactPage;