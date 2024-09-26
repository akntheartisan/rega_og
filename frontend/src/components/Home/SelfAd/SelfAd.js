import React from "react";

const SelfAd = () => {
  return (
    <>
      <div className="abt-section mb-5" style={{backgroundColor:'#f5f5f5',padding:'30px'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="abt-bg">
                <a
                  href="https://www.youtube.com/watch?v=DBLlFWYcIGQ"
                  className="video-play-btn popup-youtube"
                >
                  <i className="fas fa-play" />
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="abt-text">
                <p className="top-sub">Since Year 1999</p>
                <h2>
                  We are <span className="orange-text">Fruitkha</span>
                </h2>
                <p>
                  Etiam vulputate ut augue vel sodales. In sollicitudin neque et
                  massa porttitor vestibulum ac vel nisi. Vestibulum placerat
                  eget dolor sit amet posuere. In ut dolor aliquet, aliquet
                  sapien sed, interdum velit. Nam eu molestie lorem.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Sapiente facilis illo repellat veritatis minus, et labore
                  minima mollitia qui ducimus.
                </p>
                <a href="about.html" className="boxed-btn mt-4">
                  know more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelfAd;
