import React from 'react';
import { Col, Row } from 'react-bootstrap'; 

function CategoryList({ categories }) {
  return (
    <div>
    <Row className='d-flex justify-content-between align-items-center'>
      {categories.map((category) => ( 
        <Col key={category.id} xs={6} sm={6} md={4} lg={2} className='align-center'>
          <div className="category card" >
            <p>{category.name}</p>
          </div>
        </Col>
      ))}</Row>
    </div>
  );
}

export default CategoryList;

