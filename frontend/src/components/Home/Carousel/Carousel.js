import React from "react";
import Header from "../../Header/Header";

const Carousel = () => {
  return (
    <>
      <div className="homepage-slider">
        <div
          className="single-homepage-slider homepage-bg-1"
          style={{ height: "100vh" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-7 offset-lg-1 offset-xl-0">
                <div className="hero-text">
                  <div className="hero-text-tablecell">
                    <p className="subtitle">Explore the Future of Mobility</p>
                    <h1>High-Performance e-Bikes</h1>
                    <div className="hero-btns">
                      <a href="shop.html" className="boxed-btn">
                        e-Bike Collection
                      </a>
                      <a href="contact.html" className="bordered-btn">
                        Get in Touch
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="single-homepage-slider homepage-bg-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1 text-center">
                <div className="hero-text">
                  <div className="hero-text-tablecell">
                    <p className="subtitle">Fresh Everyday</p>
                    <h1>100% Organic Collection</h1>
                    <div className="hero-btns">
                      <a href="shop.html" className="boxed-btn">
                        Visit Shop
                      </a>
                      <a href="contact.html" className="bordered-btn">
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="single-homepage-slider homepage-bg-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1 text-right">
                <div className="hero-text">
                  <div className="hero-text-tablecell">
                    <p className="subtitle">Mega Sale Going On!</p>
                    <h1>Get December Discount</h1>
                    <div className="hero-btns">
                      <a href="shop.html" className="boxed-btn">
                        Visit Shop
                      </a>
                      <a href="contact.html" className="bordered-btn">
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Carousel;
