import React from "react";
import { NavLink } from "react-router-dom";
import './footer.css';

const Footer = () => {
  return (
    <>
      <div>
        <div className="footer-area">
          <div className="container">
            <div className="row">

              <div className="col-md-4 futer_detail">
                <div className="footer-box about-widget">
                  <h2 className="widget-title">Rega</h2>
                  <p>
                    Rega Scooter is redefining urban mobility with our
                    innovative range of eco-friendly electric scooters. Our
                    mission is to offer smart, sustainable transportation
                    solutions that help reduce the carbon footprint while
                    ensuring a smooth, efficient, and stylish ride.
                  </p>
                </div>
              </div>

              <div className="col-md-4 futer_detail">
                <div className="footer-box pages">
                  <h2 className="widget-title">Pages</h2>
                  <ul>
                    <li className="current-list-item">
                      <NavLink
                        style={{ fontSize: "16px" }}
                        exact
                        to="/"
                        className={({ isActive }) =>
                          isActive ? "active" : undefined
                        }
                      >
                        Home
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        style={{ fontSize: "16px" }}
                        to="/about"
                        className={({ isActive }) =>
                          isActive ? "active" : undefined
                        }
                      >
                        About
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        style={{ fontSize: "16px" }}
                        to="/product"
                        className={({ isActive }) =>
                          isActive ? "active" : undefined
                        }
                      >
                        Product
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        style={{ fontSize: "16px" }}
                        to="/contact"
                        className={({ isActive }) =>
                          isActive ? "active" : undefined
                        }
                      >
                        Contact
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-4 futer_detail">
                <div className="footer-box get-in-touch">
                  <h2 className="widget-title">Get in Touch</h2>
                  <ul>
                    <li>34/8, East Hukupara, Gifirtok, Sadan.</li>
                    <li>support@fruitkha.com</li>
                    <li>+00 111 222 3333</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <p>
                  Copyrights © 2019 -{" "}
                  <a href="https://imransdesign.com/">Imran Hossain</a>, All
                  Rights Reserved.
                  <br />
                  Distributed By -{" "}
                  <a href="https://themewagon.com/">Themewagon</a>
                </p>
              </div>
              <div className="col-lg-6 text-right col-md-12">
                <div className="social-icons">
                  <ul>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fab fa-linkedin" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fab fa-dribbble" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
