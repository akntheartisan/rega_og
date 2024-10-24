import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import AboutHeader from '../About/AboutHeader'
import AboutSection from './AboutSection'
import MVission from './MVission'
import AboutCircle from './AboutCircle'
import Aboutus from './Aboutus'
import aboutImage from '../../assets/images/About.jpg'
import { useMediaQuery } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";

const About = () => {

  const smallScreen = useMediaQuery("(max-width:900px)");
  return (
    <>
    <Header/>
    <AboutHeader title='About Us' imageURl={aboutImage}/>
    <Aboutus/>
    <AboutSection/>
    <MVission/>
    <AboutCircle/>
    <Footer/>
    {smallScreen && <div className="" style={{
        position:"sticky",
        bottom:"0px",
        zIndex:'2'
      }} ><BottomNav />
      </div>}
    </>
  )
}

export default About