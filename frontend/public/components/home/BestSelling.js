import React from 'react'
import { Container } from 'react-bootstrap'
import SubTitle from '../general/subTitle'
import Card from '../general/productCard'
const products = [
    { id: 1, name: 'Category 1', image: '../CellPhone.svg',price:"120$" },
    { id: 2, name: 'Category 2', image: '../CellPhone.svg',price:"120$" },
    { id: 3, name: 'Category 3', image: '../CellPhone.svg',price:"120$" },
    { id: 3, name: 'Category 3', image: '../CellPhone.svg',price:"120$" },];
const BestSelling = () => {
  return (
    <div>
        <Container >
        <SubTitle mainTitle={"This Month"} title={"Best Selling Products"}/>
        <Card product={products}/>
        </Container>
    </div>
  )
}

export default BestSelling
