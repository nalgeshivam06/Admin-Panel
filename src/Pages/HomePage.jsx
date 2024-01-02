import React from 'react'
import Slider from '../components/homepage/Slider/Slider'
import AdminNavbar from '../components/AdminNavbar'
import MidInfoSection from '../components/homepage/MidInfoSection/MidInfoSection'
import HeaderInfoSection from '../components/homepage/HeaderInfoSection/HeaderInfoSection'
import ImagesSection from '../components/homepage/ImagesSection/ImagesSection'
import TeamMembers from '../components/homepage/TeamMembers/TeamMembers'
import ImgGrid from '../components/homepage/ImgGrid/ImgGrid'

const HomePage = () => {
  return (
    <div>
        <AdminNavbar/>
        <Slider/>
        <MidInfoSection/>
        <HeaderInfoSection/>
        <ImagesSection/>
        <TeamMembers/>
        <ImgGrid/>
    </div>
  )
}

export default HomePage