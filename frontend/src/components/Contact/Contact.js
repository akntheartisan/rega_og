import React from 'react'
import ContactLand from './ContactLand/ContactLand'
import EnquiryForm from './EnquiryForm/EnquiryForm'
import ContactDetails from './ContactDetails/ContactDetails'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Frequentlyaq from './Frequentlyaq/Frequentlyaq'
import MapComponent from './MapComponent/MapComponent'
import ChatWidget from './ChatWidget/ChatWidget'

const Contact = () => {
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
    </>
  )
}

export default Contact