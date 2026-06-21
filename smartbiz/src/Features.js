import React,{useEffect} from 'react';
import './App.css';

import eascImg from './EASc.webp';
import simgImg from './SIMg.webp';
import sccoImg from './SCCo.webp';
import ddbaImg from './DDBA.webp';

export default function FeaturesPage() {
useEffect(() => {
  window.scrollTo(0, 0); // Force scroll to top when the component mounts
}, []);
  return (
  <div className='body'>
    <br/><br></br>
   <h1 className='fea-title'>Features</h1>
  <div className="features-container">
    
    
      <div className="feature-card">
        <img src={eascImg} alt="Appointment Scheduling" className="feature-image" />
        <div className="feature-title">Effortless Appointment Scheduling</div>
      </div>

      <div className="feature-card">
        <img src={simgImg} alt="Inventory Management" className="feature-image" />
        <div className="feature-title">Simplified Inventory Management</div>
      </div>

      <div className="feature-card">
        <img src={sccoImg} alt="Client Communication" className="feature-image" />
        <div className="feature-title">Seamless Client Communication</div>
      </div>

      <div className="feature-card">
        <img src={ddbaImg} alt="Business Analytics" className="feature-image" />
        <div className="feature-title">Data-Driven Business Analytics</div>
      </div>

     
    </div>
    </div>
  );
}
