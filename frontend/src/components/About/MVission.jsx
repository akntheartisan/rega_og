import React from "react";
import "./MVission.css";

const MVission = () => {
  return (
    <>
      <h2
        className="vm-head"
        style={{
          textAlign: "center",
          color: "#F28123",
          height: "50px",
          padding: "8px",
        }}
      >
        OUR MISSION{" "}
        <i
          className="fas fa-arrows-alt-h"
          style={{ textAlign: "center", color: "#051922" }}
        ></i>{" "}
        OUR VISION
      </h2>
      <div className="section-mission">
        <section className="facilities mb container ">
          <div className="fac-heading heading mb"></div>
          <div className="fac-content">
            <div className="fac-item">
              <div className="fac">
                <div className="fac-img">
                  <img
                    src="https://images.pexels.com/photos/6457514/pexels-photo-6457514.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Mission"
                  />
                </div>
                <div className="fac-text">
                  <h3>OUR MISSION</h3>
                  <p>
                    To provide high-quality, reliable electric scooters that
                    blend innovation, design, and sustainability. To deliver an
                    exceptional customer experience through a seamless online
                    platform, transparent pricing, and efficient after-sales
                    support.
                  </p>
                </div>
              </div>
            </div>
            <div className="fac-item">
              <div className="fac fac-right">
                <div className="fac-img-right">
                  <img
                    src="https://images.pexels.com/photos/63901/pexels-photo-63901.jpeg?_gl=1*86epah*_ga*MTMyNTA3MTczMS4xNzQyMjEyNjE2*_ga_8JE65Q40S6*czE3NTM0NDc1MzIkbzExJGcxJHQxNzUzNDQ3NzE2JGo1NCRsMCRoMA.."
                    alt="Vision"
                  />
                </div>
                <div className="fac-text">
                  <h3>OUR VISION</h3>
                  <p>
                    To revolutionize urban mobility by making eco-friendly
                    electric scooters accessible, affordable, and appealing to
                    every household in India and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MVission;
