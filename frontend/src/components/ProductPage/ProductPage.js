import React from 'react'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import AboutHeader from '../About/AboutHeader'
// import ProductContent from './ProductContent' 
import scooty1 from "../../assets/images/scooty1.png"   

import ProductSection from './ProductSection'
import Product from '../Home/Product/Product'
import { useMediaQuery } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";

const ProductPage = () => {
  const smallScreen = useMediaQuery("(max-width:902px)");
  return (
<>
<Header />
<AboutHeader title="Products" imageURl={scooty1}/>
<Product/>
<Footer />

{smallScreen && <div className="" style={{
        position:"sticky",
        bottom:"0px"
      }} ><BottomNav />
      </div>}

    </>
  )
}

export default ProductPage