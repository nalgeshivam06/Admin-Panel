import React from 'react'
import Slider from '../components/homepage/Slider'
import AdminNavbar from '../components/AdminNavbar'
import MidInfoSection from '../components/homepage/MidInfoSection'
import HeaderInfoSection from '../components/homepage/HeaderInfoSection'
import ImagesSection from '../components/homepage/ImagesSection'
import TeamMembers from '../components/homepage/TeamMembers'

const HomePage = () => {
  return (
    <div>
        <AdminNavbar/>
        <Slider/>
        <MidInfoSection/>
        <HeaderInfoSection/>
        <ImagesSection/>
        <TeamMembers/>
    </div>
  )
}

export default HomePage