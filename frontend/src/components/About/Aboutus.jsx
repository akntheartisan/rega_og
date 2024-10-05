import React from "react";
import rega from "../../assets/images/rega.jpg";
import "./Aboutus.css";

const Aboutus = () => {
  return (
    <div className="container-fluid aboutus-container1">
      <h2 className="Aboutus-head1" style={{ color: "#F28123" }}>
        About Us
      </h2>

      <div className="container aboutus-container2">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 Aboutus-content">
            <div className="About-us-head text-center">
              <h3>
                Welcome to{" "}
                <span style={{ color: "#F28123", fontFamily: "poppins" }}>
                  Rega Scooter
                </span>
              </h3>
            </div>
            <p>
              Rega Scooter is redefining urban mobility with our innovative
              range of eco-friendly electric scooters. Our mission is to offer
              smart, sustainable transportation solutions that help reduce the
              carbon footprint while ensuring a smooth, efficient, and stylish
              ride. Whether you're navigating busy city streets or enjoying a
              weekend cruise, our e-scooters combine cutting-edge technology,
              powerful battery options, and modern design to provide a reliable,
              cost-effective mode of transportation.
            </p>
            <p>
              As a forward-thinking company, we are committed to delivering
              products that prioritize both performance and sustainability. Each
              Rega Scooter is built with quality, safety, and user experience in
              mind, giving riders the confidence to embrace a cleaner, greener
              way of moving around. Join us in revolutionizing the way we
              commute—one ride at a time.
            </p>
          </div>

          <div className="col-12 col-md-6 Aboutus-image">
            <img src={rega} alt="Rega Scooter" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
