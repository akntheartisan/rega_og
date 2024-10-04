import React from 'react';
import './MapComponent.css';

const MapComponent = () => {
  return (
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15719.340771122754!2d78.08153754449887!3d9.947666792479561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00cf491d8b6ff9%3A0x5c8492502e237ea8!2sK%20M%20G%20Nagar%2C%20Tamil%20Nadu%20625018!5e0!3m2!1sen!2sin!4v1726078183180!5m2!1sen!2sin"
        width="2000"  // Adjust width for a horizontal aspect ratio
        height="400"  // Adjust height to maintain proportion
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
      ></iframe>
    </div>
  );
};

export default MapComponent;
