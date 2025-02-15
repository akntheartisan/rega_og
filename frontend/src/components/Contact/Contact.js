import React from 'react'
import ContactLand from './ContactLand/ContactLand'
import EnquiryForm from './EnquiryForm/EnquiryForm'
import ContactDetails from './ContactDetails/ContactDetails'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Frequentlyaq from './Frequentlyaq/Frequentlyaq'
import MapComponent from './MapComponent/MapComponent'
import ChatWidget from './ChatWidget/ChatWidget'
import { useMediaQuery } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";

const Contact = () => {
  const smallScreen = useMediaQuery("(max-width:902px)");
  return (
    <>
    <Header/>
    <ContactLand/>
    <ContactDetails/>
    <MapComponent/>
    <EnquiryForm/>
    {/* <Frequentlyaq/>  */}
    <ChatWidget/>
    <Footer/>
    {smallScreen && <div className="" style={{
        position:"sticky",
        bottom:"0px",
        borderTop:"0.05em solid white"
      }} ><BottomNav />
      </div>}
    </>
  )
}

export default Contact