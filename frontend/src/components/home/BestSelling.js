import React from 'react'
import { Container } from 'react-bootstrap'
import SubTitle from '../general/subTitle'
import Card from '../general/productCard'

const BestSelling = () => {
  return (
    <div>
        <Container >
        <SubTitle mainTitle={"This Month"} title={"Best Selling Products"}/>
        <Card />
        </Container>
    </div>
  )
}

export default BestSelling
