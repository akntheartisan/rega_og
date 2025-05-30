import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { client } from "../Client/Client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CheckoutHeader from "./CheckoutHeader";
import minus from "./minus-button.png";
import add from "./add.png";
import { useMediaQuery } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";

const intial = {
  name: "",
  username: "",
  address: "",
  district: "",
  state: "",
  pincode: "",
  mobile: "",
};

var multiCartData;
var singleCartData;
var cartItemsQuantity ;



const Checkout = () => {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(UserContext);
  const [checked, setChecked] = useState(false);
  const [shipAddress, setShipAddress] = useState(intial);
  const [error,setError]=useState({
    name: "",
    username: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    mobile: "",
  })
  const [pod, setPod] = useState();
  const [online, setOnline] = useState();
  const [model, setModel] = useState(true);
  const [totalShow, setTotalShow] = useState(true);
  const [singleQuantity, setSingleQuantity] = useState(0);
  const [cartData, setCartData] = useState();
  const [loader, setLoader] = useState(false);
  const [total,setTotal] = useState()

  const smallScreen = useMediaQuery("(max-width:768px)");

  const isShipAddressEmpty = (address) => {
    return Object.keys(address).every(
      (key) => shipAddress[key] === intial[key]
    );
  };


  

 

  const location = useLocation();
  // const {state}=location  || {};
  

  console.log("state value " + location.state)

    useEffect(()=>{
      if(location.state ===null ){
        navigate("/")
      }else{
        multiCartData = location.state.cartDetails ;
        singleCartData =location.state.singleItem;
        cartItemsQuantity = location.state.cartItemsQuantity;
        const singleQuantityPrice = singleQuantity  ? singleQuantity * singleCartData.subModelDetails.price: 0;
        const total1=location.state.total ? location.state.total: singleQuantityPrice;
        setTotal(total1)                    
         
      }
      },[location,navigate,singleQuantity,setTotal])

      console.log("single"+ singleCartData);
      console.log("Total "+total);
 
  // const total = actualTotal ? actualTotal : cartData.price;
  // const quantity = location.state.quantity;

  const navToHome = () => {
    navigate("/");
  };


  const errorMessage=(fname,value)=>{
    
    let message;
    if(value===""){
      message =`${fname} is Reqiured`
    }

    if(fname==="name"){
      if(value.length<3){
           message =`${fname} is Invalid`
    }else{
      message = "";
    }
  }

  if(fname==="username"){
    if(value.length<3){
      message = `${fname} is Invalid`
      }else{
        message = "";
      }

  }

  if(fname==="address"){
    if(value.length<10){
      message = `${fname} is Invalid`
  }else{
    message = "";
  }}


  if(fname==="district"){
    if(value.length<3){
      message = `${fname} is Invalid`
  }else{
    message = "";
  }}

  if(fname==="state"){
    if(value.length<3){
      message = `${fname} is Invalid`
  }else{
    message = "";
  }}

  if(fname==="pincode"){
    if(value.length<6){
      message = `${fname} is Invalid`
  }else{
    message = "";
  }}

  if(fname==="mobile"){
    const numericValue = value.replace(/[^0-9]/g, "");

      if (numericValue.length < 10) {
        message = "Phone number needs 10 characters";
      } else if (numericValue.length > 10) {
        message = "Phone number is too long";
      } else {
        const prefix = parseInt(numericValue.slice(0, 2), 10);
        if (!(prefix >= 63 && prefix <= 99)) {
          message = "Invalid Phone Number";
        } else {
          message = "";
        }
      }}






    return {message:message}
  }


  console.log("Error" + error.name)
  const handleBillChange = (e) => {
    const { name, value } = e.target;

    const error=errorMessage(name,value).message;

  setError((prev)=>{
     return(
      {
        ...prev,
        [name]:error
      }
     )
  })

    setShipAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const scrollToTop = () => {
    var position;
    if (window.innerWidth >= 890) {
      position = 0;
      window.scrollTo({ top: position, behavior: "smooth" });
    }
  };

  const handlePaymentDelivery = (e) => {
    setPod(e.target.checked);
    setOnline(false);
    scrollToTop();
  };

  const handlePaymentOnline = (e) => {
    setOnline(e.target.checked);
    setPod(false);
    scrollToTop();
  };

  const placeorder = () => {
    setLoader(true);

    if (pod) {
      console.log("payment on delivery");
      addSelectedProduct("offline");
    }

    if (online) {
      console.log("online payment");
      addSelectedProduct("online");
    }
  };

  const addSelectedProduct = async (paymentMode) => {
    var userDetails;

    const userId = userData._id;

    var singleCartArray = [];

    if (typeof singleCartData === "object") {
      const updateSingleCartData = {
        ...singleCartData,
        quantity: singleQuantity,
      };
      singleCartArray.push(updateSingleCartData);
    }

    console.log(singleCartArray);

    if (checked) {
      userDetails = { ...userData, userId };
      console.log(userDetails);
    } else {
      userDetails = { ...shipAddress, userId };
      console.log(userDetails);
    }

    try {
      const cartOffline = await client.post("/cart/addCart", {
        userDetails,
        total,
        paymentMode,
        cartData: multiCartData ? multiCartData : [...singleCartArray],
      });

      console.log(cartOffline);

      if (cartOffline.data.message === "offline") {
        navigate("/");
        toast.success("your order has been placed");
        setChecked(false);
        setPod(false);
        setModel(false);
        setTotalShow(false);
        setLoader(false);
      }

      if (cartOffline.data.error === "Amount exceed") {
        toast.error("Amount exceed");
      } else {
        initPayment(cartOffline.data.transaction);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initPayment = (data) => {
    var verify;

    const options = {
      key: "rzp_test_ooBBvuCJO2yhPh",
      amount: 200,
      currency: data.currency,
      name: "REGA SCOOTER",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        console.log("Test Transaction:");
        console.log(response);

        response.razorpay_order_id = data.id;
        response.razorpay_signature = response.razorpay_signature;
        try {
          verify = await client.post("/cart/verify", response);
          console.log(verify);

          if (verify.data.message === "Payment Verified Sucessfully") {
            addCartOnlinePayment(
              response.razorpay_order_id,
              response.razorpay_payment_id
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const addCartOnlinePayment = async (order, payment) => {
    var userDetails;
    const userId = userData._id;
    const order_id = order;
    const payment_id = payment;

    var singleCartArray = [];

    if (typeof singleCartData === "object") {
      const updateSingleCartData = {
        ...singleCartData,
        quantity: singleQuantity,
      };
      singleCartArray.push(updateSingleCartData);
    }

    if (checked) {
      userDetails = { ...userData, userId };
      console.log(userDetails);
    } else {
      userDetails = { ...shipAddress, userId };
      console.log(userDetails);
    }

    try {
      const cartOnline = await client.post("/cart/addCartOnline", {
        userDetails,
        total,
        cartData: multiCartData ? multiCartData : [...singleCartArray],
        order_id,
        payment_id,
      });

      console.log(cartOnline);

      if (cartOnline.status === 200) {
        toast.success("Order has been placed successfully");
        setChecked(false);
        setPod(false);
        setModel(false);
        setTotalShow(false);
        navigate("/");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addQuantity = () => {
    console.log('add quantity');
    
    setSingleQuantity((prev) => prev + 1);
  };

  console.log(singleQuantity)

  const minusQuantity = () => {
    if (singleQuantity === 0) {
      return false;
    } else {
      setSingleQuantity((prev) => prev - 1);
    }
  };

  return (
    <>
      <CheckoutHeader />
      <div>
        <div className="checkout-section mt-5 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="checkout-accordion-wrap">
                  <div className="accordion" id="accordionExample">
                    <div className="card single-accordion">
                      <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Billing Address
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="billing-address-form">
                            <form>
                              <p>
                                <input
                                  type="text"
                                  value={userData.name}
                                  placeholder="Name"
                                />
                              </p>
                              <p>
                                <input
                                  type="text"
                                  value={userData.username}
                                  placeholder="Email"
                                />
                              </p>
                              <p>
                                <input
                                  type="text"
                                  value={userData.address}
                                  placeholder="Address"
                                />
                              </p>
                              <p style={{ display: "flex", gap: "10px" }}>
                                <input
                                  type="text"
                                  value={userData.district}
                                  placeholder="district"
                                />
                                <input
                                  type="text"
                                  value={userData.state}
                                  placeholder="state"
                                />
                                <input
                                  type="text"
                                  value={userData.pincode}
                                  placeholder="pincode"
                                />
                              </p>
                              <p>
                                <input
                                  type="text"
                                  value={userData.mobile}
                                  placeholder="Phone"
                                />
                              </p>
                            </form>
                            <button
                              className="stepper_button"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseTwo"
                              aria-expanded="true"
                              aria-controls="collapseTwo"
                            >
                              NEXT
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card single-accordion">
                      <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link collapsed"
                            // type="button"
                            // data-toggle="collapse"
                            // data-target="#collapseTwo"
                            // aria-expanded="false"
                            // aria-controls="collapseTwo"
                          >
                            Shipping Address
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div
                          className="form-check"
                          style={{
                            width: "40%",
                            marginTop: "30px",
                            marginLeft: "37px",
                          }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            id="flexCheckDefault"
                            {...(checked ? { checked } : {})}
                          />
                          <h6
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Same as Billing Address
                          </h6>
                        </div>

                        <div
                          className="card-body"
                          style={{ marginTop: "-10px" }}
                        >
                          <div className="billing-address-form">
                            <form>
                              <p>
                                <input
                                max={20}
                                  type="text"
                                  name="name"
                                  value={
                                    checked ? userData.name : shipAddress.name
                                  }
                                  onKeyDown={
                                    (e)=>{
                                      if( checked ? userData.name.length : shipAddress.name.length===0 && e.key===" "){
                                        e.preventDefault();
                                        return
                                      }
                                    }
                                  }
                                  placeholder="Name"
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                                 {error.name !== "" && <div className="error">{error.name}</div>}
                              </p>
                              <p>
                                <input
                                  type="text"
                                  name="username"
                                  value={
                                    checked
                                      ? userData.username
                                      : shipAddress.username
                                  }

                                  onKeyDown={(e) => {
                                    const allowedKeys = [
                                      "Backspace",
                                      "ArrowLeft",
                                      "ArrowRight",
                                      "Delete",
                                      "Tab",
                                    ];
                                    const allowedCharPattern = /^[0-9a-z._@-]$/;
                        
                                    if (
                                      !allowedKeys.includes(e.key) &&
                                      !allowedCharPattern.test(e.key)
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  placeholder="Email"
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                                  {error.username !== "" && <div className="error">{error.username}</div>}
                              </p>
                              <p>
                                <input
                                max={40}
                                  type="text"
                                  name="address"
                                  value={
                                    checked
                                      ? userData.address
                                      : shipAddress.address
                                  }
                                  onKeyDown={
                                    (e)=>{
                                      if( checked ? userData.address.length : shipAddress.address.length===0 && e.key===" "){
                                        e.preventDefault();
                                        return
                                      }
                                    }
                                  }
                                  placeholder="Address"
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                              {error.address !== "" && <div className="error">{error.address}</div>}
                              
                              </p>
                              <p style={{ display: "flex", gap: "10px" }}>
                                <p>
                                <input
                                max={30}
                                  type="text"
                                  name="district"
                                  value={
                                    checked
                                      ? userData.district
                                      : shipAddress.district
                                  }
                                  onKeyDown={
                                    (e)=>{
                                      if( checked ? userData.district.length : shipAddress.district.length===0 && e.key===" "){
                                        e.preventDefault();
                                        return
                                      }
                                    }
                                  }
                                  placeholder="district"
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                                {error.district !== "" && <div className="error">{error.district}</div>}
                                </p>
                                <p>
                                <input
                                max={30}
                                  type="text"
                                  name="state"
                                  value={
                                    checked ? userData.state : shipAddress.state
                                  }
                                  onKeyDown={
                                    (e)=>{
                                      if( checked ? userData.state.length : shipAddress.state.length===0 && e.key===" "){
                                        e.preventDefault();
                                        return
                                      }
                                    }
                                  }
                                  placeholder="state"
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                                {error.state !== "" && <div className="error">{error.state}</div>}
</p>
<p>
                                <input
                                max={6}
                                  type="text"
                                  name="pincode"
                                  value={
                                    checked
                                      ? userData.pincode
                                      : shipAddress.pincode
                                  }
                                  placeholder="pincode"
                                  onKeyDown={(e) => {
                                    const allowedKeys = [
                                      "Backspace",
                                      "ArrowLeft",
                                      "ArrowRight",
                                      "Delete",
                                      "Tab",
                                    ];
                                    const allowedCharPattern = /^[0-9]$/;
                        
                                    if (
                                      !allowedKeys.includes(e.key) &&
                                      !allowedCharPattern.test(e.key)
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                                {error.pincode !== "" && <div className="error">{error.pincode}</div>}
                                </p>
                              </p>
                              <p>
                                <input
                                max={10}
                                  type="text"
                                  name="mobile"
                                  value={
                                    checked
                                      ? userData.mobile
                                      : shipAddress.mobile
                                  }
                                  placeholder="Phone"
                                  onKeyDown={(e) => {
                                    const allowedKeys = [
                                      "Backspace",
                                      "ArrowLeft",
                                      "ArrowRight",
                                      "Delete",
                                      "Tab",
                                    ];
                                    const allowedCharPattern = /^[0-9]$/;
                        
                                    if (
                                      !allowedKeys.includes(e.key) &&
                                      !allowedCharPattern.test(e.key)
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={handleBillChange}
                                  {...(checked ? { readOnly: true } : {})}
                                />
                                {error.mobile !== "" && <div className="error">{error.mobile}</div>}

                              </p>
                            </form>
                            <button
                              className="stepper_button"
                              type="button"
                              data-toggle="collapse"
                              data-target="#headingSummary1"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                              disabled={
                                isShipAddressEmpty(shipAddress) && !checked
                              }
                            >
                              NEXT
                            </button>
                            &nbsp;&nbsp;
                            <button
                              className="stepper_button_back"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              BACK
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {singleCartData && (
                      <div className="card single-accordion">
                        <div className="card-header" id="headingSummary">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link collapsed"
                              // type="button"
                              // data-toggle="collapse"
                              // data-target="#headingSummary1"
                              // aria-expanded="false"
                              // aria-controls="collapseThree"
                            >
                              Product Summary
                            </button>
                          </h5>
                        </div>
                        <div
                          id="headingSummary1"
                          className="collapse"
                          aria-labelledby="headingSummary"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <div
                              className="card-details"
                              style={{ display: "flex" }}
                            >
                              <div>
                                <img
                                  src={singleCartData.image}
                                  style={{
                                    width: "150px",
                                    height: "150px",
                                    objectFit: "cover",
                                  }}
                                  alt="model"
                                />
                              </div>
                              <div style={{ alignSelf: "center" }}>
                                <p style={{ marginBottom: "10px" }}>
                                  <strong>Model</strong> :{" "}
                                  {singleCartData.model}
                                </p>
                                <p style={{ marginBottom: "10px" }}>
                                  <strong>Battery Variant :</strong>{" "}
                                  {singleCartData.battery}
                                </p>
                                <p style={{ marginBottom: "10px" }}>
                                  <strong>Price :</strong>{" "}
                                  {singleCartData.subModelDetails.price}
                                </p>
                                <div style={{ display: "flex" }}>
                                  <button
                                    onClick={minusQuantity}
                                    style={{
                                      background: "none",
                                      border: "none",
                                    }}
                                  >
                                    <img src={minus} />
                                  </button>
                                  <input
                                    className="form-control"
                                    type="text"
                                    style={{ width: "50px" }}
                                    value={singleQuantity}
                                  />
                                  <button
                                    onClick={addQuantity}
                                    style={{
                                      background: "none",
                                      border: "none",
                                    }}
                                  >
                                    <img src={add} />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <button
                              className="stepper_button"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                              disabled={!singleQuantity}
                            >
                              NEXT
                            </button>
                            &nbsp;&nbsp;
                            <button
                              className="stepper_button_back"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseTwo"
                              aria-expanded="true"
                              aria-controls="collapseTwo"
                            >
                              BACK
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {multiCartData && (
                      <div className="card single-accordion">
                        <div className="card-header" id="headingSummary">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link collapsed"
                              // type="button"
                              // data-toggle="collapse"
                              // data-target="#headingSummary1"
                              // aria-expanded="false"
                              // aria-controls="collapseThree"
                            >
                              Product Summary
                            </button>
                          </h5>
                        </div>
                        <div
                          id="headingSummary1"
                          className="collapse"
                          aria-labelledby="headingSummary"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            {multiCartData.map((each, index) => {
                              return (
                                <div
                                  className="card-details"
                                  style={{ display: "flex" }}
                                  key={index}
                                >
                                  <div>
                                    <img
                                      src={each.image}
                                      style={{
                                        width: "150px",
                                        height: "150px",
                                        objectFit: "cover",
                                      }}
                                      alt="model"
                                    />
                                  </div>
                                  <div style={{ alignSelf: "center" }}>
                                    <p style={{ marginBottom: "10px" }}>
                                      <strong>Model</strong> : {each.model}
                                    </p>
                                    <p style={{ marginBottom: "10px" }}>
                                      <strong>Battery Variant :</strong>{" "}
                                      {each.subModelDetails.battery}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                            <hr />
                          </div>
                          <button
                            className="stepper_button"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            NEXT
                          </button>
                          &nbsp;&nbsp;
                          <button
                            className="stepper_button_back"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="true"
                            aria-controls="collapseTwo"
                          >
                            BACK
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="card single-accordion">
                      <div className="card-header" id="headingThree">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link collapsed"
                            type="button"
                            // data-toggle="collapse"
                            // data-target="#collapseThree"
                            // aria-expanded="false"
                            // aria-controls="collapseThree"
                          >
                            Payment Details
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseThree"
                        className="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="card-details">
                            <p style={{ fontSize: "14px" }}>
                              Choose Your Mode of Payment
                            </p>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                                marginTop: "15px",
                              }}
                            >
                              <div className="form-check">
                                <div>
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    value={pod}
                                    onChange={handlePaymentDelivery}
                                    checked={pod}
                                    // {...(pod ? { checked } : {})}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault1"
                                  >
                                    Pay on Delivery
                                  </label>
                                </div>
                              </div>
                              <div className="form-check">
                                <div>
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    value={online}
                                    onChange={handlePaymentOnline}
                                    checked={online}
                                    // {...(pod ? { checked } : {})}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault2"
                                  >
                                    Online Payment
                                  </label>
                                </div>
                              </div>
                            </div>
                            <button
                              className="stepper_button_back"
                              type="button"
                              data-toggle="collapse"
                              data-target="#headingSummary1"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              BACK
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="order-details-wrap">
                  <table className="order-details" style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th colSpan={2}>Price Details (Incl., of all taxes)</th>
                      </tr>
                    </thead>
                    <tbody className="order-details-body">
                      <tr>
                        <td style={{ fontSize: "14px", fontWeight: "500" }}>
                          Product ({cartItemsQuantity ? cartItemsQuantity : 1}
                          Items)
                        </td>
                        <td style={{ fontSize: "14px", fontWeight: "500" }}>
                          &#8377; {total}
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="checkout-details">
                      <tr>
                        <td style={{ fontSize: "17px", fontWeight: "500" }}>
                          Total
                        </td>
                        <td style={{ fontSize: "17px", fontWeight: "500" }}>
                          &#8377; {total}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {(pod || online) && (
                    <button
                      onClick={!loader ? placeorder : undefined}
                      style={{
                        backgroundColor: "#F28123",
                        color: "white",
                        borderColor: "#F28123",
                        padding: "10px 20px",
                        borderRadius: "60px",
                        marginTop: "15px",
                      }}
                    >
                      Place Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {smallScreen ? <div className="mt-3" style={{
        position:"sticky",
        bottom:"0px",
        borderTop:"0.05em solid white"
      }} ><BottomNav />
      </div> :  <div className="mt-3" ><Footer /></div>}
    </>
  );
};

export default Checkout;
