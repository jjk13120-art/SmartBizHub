import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  };
  useEffect(() => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  });
}, []);


  const [isSignedIn, setIsSignedIn] = useState(null);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [shop, setShop] = useState(null);
  const [profileImg, setProfileImg] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [address, setAddress] = useState(getCookie('address') || '');


  // New state for sorting order
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fullnameCookie = getCookie('fullname');
    const emailCookie = getCookie('email');

    if (!fullnameCookie || !emailCookie) {
      if (!hasRedirected) {
        setHasRedirected(true);
        alert('Please sign up or log in first.');
        window.location.href = '/form';
      }
    } else {
      setFullname(fullnameCookie);
      setEmail(emailCookie);
      setDescription(getCookie('description') || 'No description available.');
      setIsSignedIn(true);
      fetchShopByEmail(emailCookie);
      fetchPurchaseHistory();

      axios.get(`http://localhost:3001/getuser/${emailCookie}`)
        .then(res => {
         if (res.data.success && res.data.user) {
  if (res.data.user.profileImg) {
    setProfileImg(`http://localhost:3001/${res.data.user.profileImg}`);
  }
  if (res.data.user.address) {
    setAddress(res.data.user.address);
    document.cookie = `address=${encodeURIComponent(res.data.user.address)}; path=/`;
  }
}

        })
        .catch(err => console.error(err));
    }
  }, [hasRedirected]);

  const handleProfileUpload = async (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    try {
      const res = await axios.post("http://localhost:3001/upload-profile-img", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data.success) {
        setProfileImg(res.data.profileImg);
        alert("Profile photo updated!");
        setShowUpload(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPurchaseHistory = async () => {
    try {
      const res = await axios.get('http://localhost:3001/mypurchases', {
        withCredentials: true,
      });
      if (res.data.success) {
        setPurchases(res.data.purchases || []);
      }
    } catch (err) {
      console.error("Error fetching purchases:", err);
    }
  };

  const fetchShopByEmail = async (email) => {
    try {
      const res = await axios.get(`http://localhost:3001/getshopbyemail/${email}`);
      if (res.data.success && res.data.shop) {
        setShop(res.data.shop);
      }
    } catch (err) {
      console.error("Error fetching shop:", err);
    }
  };

  const handleSave = async () => {
  document.cookie = `fullname=${encodeURIComponent(fullname)}; path=/`;
  document.cookie = `email=${encodeURIComponent(email)}; path=/`;
  document.cookie = `description=${encodeURIComponent(description)}; path=/`;
  document.cookie = `address=${encodeURIComponent(address)}; path=/`;

  try {
    const formData = new FormData();
    formData.append("address", address);

    await axios.post("http://localhost:3001/upload-profile-img", formData, {
      withCredentials: true
    });

    alert("Information saved!");
  } catch (err) {
    console.error("Error saving address:", err);
  }

  setEditingField(null);
};


  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px'
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '20px',
    marginTop: '120px',
    padding: '20px'
  };

  const cardStyle = {
    flex: '0 0 600px',
    padding: '30px',
    borderRadius: '12px',
    background: 'white',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)'
  };

  const historyPanelStyle = {
    flex: '0 0 400px',
    maxHeight: '700px',
    overflowY: 'auto',
    padding: '20px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginTop: '20px',
    display: 'block'
  };

  const buttonStyle = {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  };

  const purchaseCard = {
    background: '#f9fafb',
    padding: '12px 15px',
    color: "black",
    marginTop: '12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  };

  if (isSignedIn === null) return null;

  // Sort purchases by date based on sortOrder
  const sortedPurchases = [...purchases].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });
  

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: "black", textAlign: 'center' }}>User Profile</h1>
        <hr />
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
              src={profileImg || 'http://localhost:3001/profile/default.png'}
            alt="Profile"
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
              margin: '0 auto'
            }}
          />
          <button
            style={{ ...buttonStyle, marginTop: '10px' }}
            onClick={() => setShowUpload(!showUpload)}
          >
            {showUpload ? "Cancel" : "Update Profile Photo"}
          </button>
          {showUpload && (
            <div style={{ marginTop: '10px' }}>
              <input type="file" onChange={handleProfileUpload} />
            </div>
          )}
        </div>

        <label style={labelStyle}>Full Name:</label>
        {editingField === 'name' ? (
          <input style={inputStyle} value={fullname} onChange={(e) => setFullname(e.target.value)} />
        ) : (
          <h3 style={{ color: "black" }}>{fullname}</h3>
        )}
        <button style={buttonStyle} onClick={() => setEditingField('name')}>Edit Name</button>

        <label style={labelStyle}>Email:</label>
        {editingField === 'email' ? (
          <input style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
        ) : (
          <h3 style={{ color: "black" }}>{email}</h3>
        )}
        <button style={buttonStyle} onClick={() => setEditingField('email')}>Edit Email</button>
        <label style={labelStyle}>Address:</label>
{editingField === 'address' ? (
  <textarea
    style={{ ...inputStyle, minHeight: '60px' }}
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  />
) : (
  <h3 style={{ color: "black" }}>{address || 'No address available'}</h3>
)}
<button style={buttonStyle} onClick={() => setEditingField('address')}>Edit Address</button>



        <label style={labelStyle}>Description:</label>
        {editingField === 'description' ? (
          <textarea
            style={{ ...inputStyle, minHeight: '80px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <h3 style={{ color: "black" }}>{description}</h3>
        )}
        <button style={buttonStyle} onClick={() => setEditingField('description')}>Edit Description</button> <br/><br/>

        {editingField && (
          <button
            style={{ ...buttonStyle, backgroundColor: '#22c55e' }}
            onClick={handleSave}
          >
            Save Changes
          </button>
        )}

        {shop && (
          <>
            <hr />
            <h2 style={{ marginTop: "30px", color: "black" }}>Shop Management ({shop.name})</h2>
            <button
              style={{ ...buttonStyle, backgroundColor: "#10b981", display: "block", width: "100%", marginTop: "15px" }}
              onClick={() => navigate(`/addproducts/${shop.shopId}`)}
            >
              Add Product to Shop
            </button>
          </>
        )}
      </div>

      {purchases.length > 0 && (
        <div style={historyPanelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, color: "black" }}>Purchase History</h2>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                border: '1px solid #ccc'
              }}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          {sortedPurchases.map((p, i) => (
            <div key={i} style={purchaseCard}>
              <p><strong>Shop ID:</strong> {p.shopId}</p>
              <p><strong>Product ID:</strong> {p.productId}</p>
              <p><strong>Quantity:</strong> {p.quantity}</p>
              <p><strong>Total:</strong> ₹{p.total}</p>
              <p><strong>Bill No:</strong> {p.billNo}</p>
              <p>
  <strong>Date:</strong>{" "}
  {new Date(p.date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  })}
</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
