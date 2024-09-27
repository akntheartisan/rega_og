import React from 'react'
import {ThreeCircles} from "react-loader-spinner"
import './ProductView.css'

const Loader = () => {
  return (
    <div className="loader">
    <ThreeCircles
      visible={true}
      height="100"
      width="100"
      color="#f28123"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
  )
}

export default Loader