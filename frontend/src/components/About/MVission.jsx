import React from 'react';
import './MVission.css';

const MVission = () => {
  return (
<>
<h2 className='vm-head' style={{textAlign:"center",color:"#F28123",height:"50px",padding:"8px"}}>OUR MISSION <i className="fas fa-arrows-alt-h" style={{textAlign:"center",color:"#051922"}}></i> OUR VISION</h2>
<div className="section-mission">
     <section className="facilities mb container ">
      <div className="fac-heading heading mb">
      </div>
      <div className="fac-content">
        <div className="fac-item">
          <div className="fac">
            <div className="fac-img">
              <img src="https://images.pexels.com/photos/6457514/pexels-photo-6457514.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Mission" />
            </div>
            <div className="fac-text">
              <h3>OUR MISSION</h3>
              <p>The college canteen is a lively hub on campus, where students gather for diverse culinary experiences. The enticing aroma of various cuisines fills the air as friends share laughter and meals. From classic comfort foods to exotic delights, the menu caters to all tastes. </p>
            </div>
          </div>
        </div>
        <div className="fac-item">
          <div className="fac">
            <div className="fac-img">
              <img src="https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Vision" />
            </div>
            <div className="fac-text">
              <h3>OUR VISION</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
   </div>
</>
  );
}

export default MVission;
