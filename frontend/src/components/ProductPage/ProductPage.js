import React from 'react'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import AboutHeader from '../About/AboutHeader'
// import ProductContent from './ProductContent' 
import scooty1 from "../../assets/images/scooty1.png"   

import ProductSection from './ProductSection'

const ProductPage = () => {
  return (
<>
<Header />
<AboutHeader title="Products" imageURl={scooty1}/>
<ProductSection/>
<Footer />

    </>
  )
}

export default ProductPage