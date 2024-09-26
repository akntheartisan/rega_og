import React from "react";
import { Link } from "react-router-dom";
import './checkout.css';

const CheckoutFooter = () => {
  return (
    <>
      <div className="checkfooter">
        <div className="row">
          <div className="col-md-4 offset-md-4" style={{display:'flex',justifyContent:'center'}}>
            <Link>
              <p style={{color:'#565656'}}>Designed By Hello Technologies</p>
            </Link>
          </div>

          <div className="col-md-4" style={{display:'flex',justifyContent:'flex-end'}}>
            <p style={{color:'#565656'}}>Need Help?&nbsp;&nbsp;&nbsp;<Link>Contact us</Link></p> 
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutFooter;
