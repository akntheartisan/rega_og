import React from 'react';
import rega from '../../assets/images/rega.jpg';
import './Aboutus.css';

const Aboutus = () => {
  return (
    <div className='container-fluid aboutus-container1'>
      <h2 className='Aboutus-head1' style={{ color: "#F28123" }}>About Us</h2>
      
      <div className="container aboutus-container2">
        <div className="row align-items-center">
          
          <div className="col-12 col-md-6 Aboutus-content">
            <div className="About-us-head text-center">
              <h3>Welcome to <span style={{ color: "#F28123", fontFamily: "poppins" }}>Rega Scooter</span></h3>
            </div>
            <p>
              Welcome to NBS Air Travels! We are a premier travel agency committed to providing exceptional travel experiences to our valued customers...
            </p>
            <p>
              Our team of experienced travel experts is well-versed in crafting customized travel solutions that suit your unique requirements...
            </p>
          </div>

          <div className="col-12 col-md-6 Aboutus-image">
            <img src={rega} alt="Rega Scooter" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Aboutus;
