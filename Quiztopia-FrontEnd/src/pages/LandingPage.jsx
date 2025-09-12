import React from 'react'
import LandinNavbar from '../components/LandinNavbar'
import Footer from '../components/Footer'
import LandingMidPart from '../components/LandingMidPart/LandingMidPart'

function LandingPage() {
  return (
    <div>
      <LandinNavbar/>
      <LandingMidPart/>
      <Footer/>
    </div>
  )
}

export default LandingPage