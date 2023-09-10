import React from 'react'
import { Container } from 'react-bootstrap'
import  SubTitle from '../general/subTitle'
import Card from '../general/categoryCard'

const categories = [
    { id: 1, name: 'Category 1', image: '../CellPhone.svg' },
    { id: 2, name: 'Category 2', image: '../CellPhone.svg' },
    { id: 3, name: 'Category 3', image: '../CellPhone.svg' },
    { id: 3, name: 'Category 3', image: '../CellPhone.svg' },
    { id: 3, name: 'Category 3', image: '../CellPhone.svg' },
    { id: 3, name: 'Category 3', image: '../CellPhone.svg' },
  ];

const homeCategory = () => {
  return (
    <div>
      <Container>
            <SubTitle mainTitle={"Categories"} title={"Browse By Category"}/>
            <Card categories={categories}/>
      </Container>
    </div>
  )
}

export default homeCategory
