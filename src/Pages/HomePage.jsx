import React from 'react'
import Slider from '../components/homepage/Slider'
import AdminNavbar from '../components/AdminNavbar'
import MidInfoSection from '../components/homepage/MidInfoSection'
import HeaderInfoSection from '../components/homepage/HeaderInfoSection'

const HomePage = () => {
  return (
    <div>
        <AdminNavbar/>
        <Slider/>
        <MidInfoSection/>
        <HeaderInfoSection/>
    </div>
  )
}

export default HomePage