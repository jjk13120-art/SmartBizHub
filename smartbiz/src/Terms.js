import React, { useEffect, useState } from 'react';

export default function TermsAndConditions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 scrolls smoothly to top on mount
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div
      style={{
        marginTop: '120px',
        padding: '2.5rem',
        color: '#111',
        backgroundColor: '#fdfdfd',
        fontFamily: 'Segoe UI, sans-serif',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: '1.8',
      }}
    >
      <h1 style={{ fontSize: '2.8rem', color: '#222', marginBottom: '1.5rem' }}>
        Terms & Conditions
      </h1>

      <p>
        Welcome to <strong>Smartbiz Hub</strong>. By using our services, you agree to comply with and be
        legally bound by the following Terms and Conditions. Please read them carefully before using the
        platform.
      </p>

      <h2 style={sectionHeading}>1. Eligibility</h2>
      <p>
        You must be at least <strong>13 years old</strong> to use Smartbiz Hub. If you are under 18,
        you must have permission from a parent or guardian.
      </p>

      <h2 style={sectionHeading}>2. User Responsibilities</h2>
      <p>
        You agree to use Smartbiz Hub only for lawful purposes and in a manner that does not infringe the
        rights of or restrict the use of others.
      </p>
      <ul style={listStyle}>
        <li>Keep your account details confidential.</li>
        <li>Do not engage in any harmful, abusive, or illegal behavior.</li>
        <li>Avoid uploading content that is defamatory, obscene, or violates intellectual property.</li>
      </ul>

      <h2 style={sectionHeading}>3. Content Ownership</h2>
      <p>
        All content on the platform, including logos, trademarks, and software, is the intellectual
        property of Smartbiz Hub or its licensors. You may not reproduce or distribute our materials
        without explicit written consent.
      </p>

      <h2 style={sectionHeading}>4. Subscription & Payments</h2>
      <p>
        Access to certain features may require a paid subscription. All payments are final and non-refundable.
        By subscribing, you agree to our pricing and billing terms.
      </p>

      <h2 style={sectionHeading}>5. Cancellation & Termination</h2>
      <p>
        We reserve the right to suspend or terminate your access to the platform at our sole discretion,
        with or without notice, for conduct that violates these Terms or is harmful to others.
      </p>

      <h2 style={sectionHeading}>6. Disclaimers</h2>
      <p>
        Smartbiz Hub is provided “<em>as-is</em>” and we make no guarantees regarding availability,
        reliability, or accuracy. Use the platform at your own risk.
      </p>

      <h2 style={sectionHeading}>7. Limitation of Liability</h2>
      <p>
        We are not liable for any indirect, incidental, or consequential damages that may arise from the
        use of our services. This includes loss of data, profits, or business opportunities.
      </p>

      <h2 style={sectionHeading}>8. Privacy Policy</h2>
      <p>
        Your use of the platform is also governed by our Privacy Policy, which outlines how we collect,
        use, and protect your personal data.
      </p>

      <h2 style={sectionHeading}>9. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the Republic of India. Any disputes shall be subject to
        the exclusive jurisdiction of the courts located in Ahmedabad, Gujarat.
      </p>

      <h2 style={sectionHeading}>10. Updates to These Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the platform following changes
        implies your acceptance of the new terms.
      </p>

      <h2 style={sectionHeading}>11. Contact Information</h2>
      <p>
        If you have questions about these Terms, please contact us:
      </p>
      <ul style={listStyle}>
        <li><strong>Email:</strong> support@smartbizhub.com</li>
        <li><strong>Phone:</strong> +91-9427028964</li>
        <li><strong>Address:</strong> Smartbiz Hub HQ, Ahmedabad, India</li>
      </ul>
    </div>
  );
}

const sectionHeading = {
  marginTop: '2rem',
  fontSize: '1.6rem',
  color: '#444',
  borderBottom: '1px solid #ccc',
  paddingBottom: '0.5rem',
  marginBottom: '0.8rem'
};

const listStyle = {
  paddingLeft: '1.5rem',
  marginBottom: '1rem',
  color: '#222',
};
