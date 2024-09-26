import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import AboutHeader from '../About/AboutHeader'
import AboutSection from './AboutSection'
import MVission from './MVission'
import AboutCircle from './AboutCircle'
import Aboutus from './Aboutus'
import aboutImage from '../../assets/images/About.jpg'


const About = () => {
  return (
    <>
    <Header/>
    <AboutHeader title='About Us' imageURl={aboutImage}/>
    <Aboutus/>
    <AboutSection/>
    <MVission/>
    <AboutCircle/>
    
    <Footer/>
    </>
  )
}

export default About