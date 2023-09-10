import React from 'react';
import { Col, Row } from 'react-bootstrap'; 

function CategoryList({ categories }) {
  return (
    <div>
    <Row className='d-flex justify-content-between'>
      {categories.map((category) => ( 
        <Col key={category.id} xs={6} sm={6} md={4} lg={2}>
          <div className="category card d-flex align-items-center m-1" >
            <img src={category.image} alt={category.name} className='svg-image'/>
            <p>{category.name}</p>
          </div>
        </Col>
      ))}</Row>
    </div>
  );
}

export default CategoryList;

