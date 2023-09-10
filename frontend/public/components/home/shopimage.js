import React from 'react'
import {  Col, Container, Image, Row } from 'react-bootstrap'


const ShopImage = ({ title, title2 }) => {
  return (
    <Container>
        <div>
<Row className='d-flex justify-content-center'>
  <Col  xs={12} sm={6} md={6} lg={6} className='d-flex justify-content-center'>
  <Image src="../../ad.svg" alt="" width={"100%"} />
  </Col>
  <Col  xs={12} sm={6} md={6} lg={6}>
    <Image src="../../ad.svg" alt="" width={"100%"} />
  </Col>
</Row>
</div>
    </Container>
  )
}

export default ShopImage

