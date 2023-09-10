import React from 'react'
import {  Button, Col, Row } from 'react-bootstrap'


const ShopImage = ({ title }) => {
    const background = {
        backgroundColor:'#DB4444',
      };
  return (
    <Row className='d-flex align-items-center justify-content-between p-4 bg-light'>
      <Col xs={12} sm={12} md={6} lg={6}>
        <div className="title text-center mb-4">
          {title}
          <br></br>
            <Button style={background}>
              Shop Now
            </Button>
        </div>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6}>
        <div className="text-center">
          <img src="../../ad.svg" alt="Ad" width={"70%"} />
        </div>
      </Col>
    </Row>
  )
}

export default ShopImage;

