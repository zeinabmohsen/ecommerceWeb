import React from 'react'
import SubTitle from '../general/subTitle'
import { Container } from 'react-bootstrap'
import ProductCard from '../general/productCard'


const ExploreSection = () => {
  return (
    <Container>
      <SubTitle mainTitle={"Our Products"}  title={"Explore Our Products"}/>
      <ProductCard />
    </Container>
  )
}

export default ExploreSection
