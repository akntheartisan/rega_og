import React from 'react';
import './AboutSection.css'; // Ensure you have this import for CSS
import '@fortawesome/fontawesome-free/css/all.min.css';


const AboutSection = () => {
  return (
    <div className="container-fluid" >
      <div className="main-contain">
      
        <div className="circle2">
          <i className="circle-icon fa-solid fa-circle-check"></i>
        </div>
        
        {/* Image Grid Section */}
        <div className="About-section-head" style={{textAlign:"center"}}>
        <h3>Start Shopping With <span style={{color:"#F28123",fontFamily:"poppins"}}>Rega Scooter</span></h3>
        </div>
        <div className="main-section-image row">
        
          <div className="image-section col-sm-12 col-md-3 image-flex">
            <i className="fa-solid fa-tags"></i>
            <p>Great deals on natural remedies and herbal supplements.</p>
          </div>
          <div className="image-section col-sm-12 col-md-3 image-flex">
            <i className="fa-solid fa-file-invoice-dollar"></i>
            <p>Enjoy Low shipping.</p>
          </div>
          <div className="image-section col-sm-12 col-md-3 image-flex">
            <i className="fa-solid fa-truck-fast"></i>
            <p>Discover daily discounts on our herbal products.</p>
          </div>
        </div>
      </div>
      <hr style={{border:"1px solid black"}}/>
    </div>
  );
}

export default AboutSection;
