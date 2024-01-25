import React from 'react'
import Slider from '../components/homepage/Slider/Slider'
import AdminNavbar from '../components/AdminNavbar'
import MidInfoSection from '../components/homepage/MidInfoSection/MidInfoSection'
import HeaderInfoSection from '../components/homepage/HeaderInfoSection/HeaderInfoSection'
import ImagesSection from '../components/homepage/ImagesSection/ImagesSection'
import TeamMembers from '../components/homepage/TeamMembers/TeamMembers'
import ImgGrid from '../components/homepage/ImgGrid/ImgGrid'
import MapDetails from '../components/homepage/MapSection/MapDetails'
import CatDescription from '../components/homepage/catDescription/catDescription'
import Imagechanger from '../components/homepage/imgChanger/Imagechanger'
import Review from '../components/homepage/review/Review'

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
        <MapDetails/>
        <CatDescription/>
        <Imagechanger/>
        <Review/>
    </div>
  )
}

export default HomePage