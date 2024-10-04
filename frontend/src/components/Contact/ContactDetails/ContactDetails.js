import React, { useState, useEffect } from 'react';
import './ContactDetails.css'; 
import scooterImage from '../../../assets/images/scooter3.png'; 
import { client } from '../../Client/Client'; 

const ContactDetails = () => {
  const [location, setLocation] = useState('');
  const [timing, setTiming] = useState('');
  const [contact, setContact] = useState({ phone: '', email: '' });

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await client.get('/contact/contactdetails');
        const data = response.data;
        setLocation(data.shopaddress);
        setTiming(data.shophours);
        setContact({ phone: data.shopmobile, email: data.shopemail });
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };

    fetchContactDetails();
  }, []);

  // Format phone numbers
  const phoneNumbers = contact.phone.split(',').map((number, index) => (
    <span key={index} className="phone-number">
      {number.trim()}
    </span>
  ));

  const shopHours = timing.split(',').map((time, index) => (
    <div key={index}>{time.trim()}</div>
  ));

  return (
    <div className="contact-details">
      <h1>Location and Timing</h1>
      <div className="contact-details-container">
        <div className="section location-box">
          <img src={scooterImage} alt="Scooter" className="scooter-animation" />
          <h2><i className="fas fa-map-marker-alt"></i> Location</h2>
          <p>{location}</p>
        </div>
        <div className="section timing-box">
          <img src={scooterImage} alt="Scooter" className="scooter-animation" />
          <h2><i className="fas fa-clock"></i> Timing</h2>
          <p>{shopHours}</p>
        </div>
        <div className="section contact-box">
          <img src={scooterImage} alt="Scooter" className="scooter-animation" />
          <h2><i className="fas fa-phone"></i> Contact Us</h2>
          <p>
            <strong>Phone:</strong><br />
            <div className="phone-list">
              {phoneNumbers}
            </div>
            Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
