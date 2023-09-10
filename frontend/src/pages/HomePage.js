import React from 'react'
import Slider from '../components/home/Slider'
import HomeCategory from '../components/home/homeCategory'
import BestSelling from '../components/home/BestSelling'
import Shopimage from '../components/home/shopimage'
import ExploreSection from '../components/home/ExploreSection'

const HomePage = () => {
  return (
    <div>
  
      <Slider />
      <HomeCategory />
      <BestSelling />
      <Shopimage title={"Enhance Your Style Experience"}/>
      <ExploreSection/>
    
    </div>
  )
}

export default HomePage
