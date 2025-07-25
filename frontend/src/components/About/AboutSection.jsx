import React from "react";
import "./AboutSection.css"; // Ensure you have this import for CSS
import "@fortawesome/fontawesome-free/css/all.min.css";

const AboutSection = () => {
  return (
    <div className="container-fluid">
      <div className="main-contain">
        <div className="circle2">
          <i className="circle-icon fa-solid fa-circle-check"></i>
        </div>

        {/* Image Grid Section */}
        <div className="About-section-head" style={{ textAlign: "center" }}>
          <h3>
            Start Shopping With{" "}
            <span style={{ color: "#F28123", fontFamily: "poppins" }}>
              Rega Scooter
            </span>
          </h3>
        </div>
        <div className="main-section-image row">
          <div className="image-section col-sm-12 col-md-4 image-flex">
            <i className="fa-solid fa-tags"></i>
            <p>
              Enjoy long-lasting battery life, quick charging, and powerful
              motors for a smooth and efficient ride every time.
            </p>
          </div>
          <div className="image-section col-sm-12 col-md-4 image-flex">
            <i className="fa-solid fa-file-invoice-dollar"></i>
            <p>
              Discover daily discounts, special offers, and EMI options designed
              to fit your budget.
            </p>
          </div>
          <div className="image-section col-sm-12 col-md-4 image-flex">
            <i className="fa-solid fa-truck-fast"></i>

            <p>
              Get your electric scooter delivered to your doorstep quickly and
              securely — with free shipping on all orders.
            </p>
          </div>
        </div>
      </div>
      <hr style={{ border: "1px solid black" }} />
    </div>
  );
};

export default AboutSection;
