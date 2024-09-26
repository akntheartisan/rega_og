import React from "react";

const ContactDetails = () => {
  return (
    <>
      <div className="col-lg-4">
        <div className="contact-form-wrap">
          <div className="contact-form-box">
            <h4>
              <i className="fas fa-map" /> Shop Address
            </h4>
            <p>
              34/8, East Hukupara <br /> Gifirtok, Sadan. <br /> Country Name
            </p>
          </div>
          <div className="contact-form-box">
            <h4>
              <i className="far fa-clock" /> Shop Hours
            </h4>
            <p>
              MON - FRIDAY: 8 to 9 PM <br /> SAT - SUN: 10 to 8 PM{" "}
            </p>
          </div>
          <div className="contact-form-box">
            <h4>
              <i className="fas fa-address-book" /> Contact
            </h4>
            <p>
              Phone: +00 111 222 3333 <br /> Email: support@fruitkha.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
