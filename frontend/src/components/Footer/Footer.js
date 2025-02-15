import React,{useState,useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import "./footer.css";
import { client } from "../Client/Client";
import logo from "./logo.png"

const Footer = () => {

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
  
  return (
    <>
      <div>
        <div className="footer-area">
          <div className="container">
            <div className="row">
              <div className="col-md-4 futer_detail">
                <div className="footer-box about-widget">
                  <img src={logo} alt="logo" style={{width:"clamp(150px,4.5vw,200px)",marginBottom:'3px'}}/>
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
                    <li>{location}</li>
                    <li>{contact.email}</li>
                    {/* {contact.phone.split(",").map((each,index)=>{
                      return <li key={index}>{each}</li>
                    })} */}
                   
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
                  Designed By -{" "}
                  <a
                    href="https://hellowtec.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hello Technologies
                  </a>
                  <br />
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
