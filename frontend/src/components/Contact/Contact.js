import React from 'react'
import ContactLand from './ContactLand/ContactLand'
import EnquiryForm from './EnquiryForm/EnquiryForm'
import ContactDetails from './ContactDetails/ContactDetails'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Contact = () => {
  return (
    <>
    <Header/>
    <ContactLand/>
    <EnquiryForm/>
    <Footer/>
    </>
  )
}

export default Contact