import rate from '../../images/rate.png'
import React from 'react'
import {  Container, Row , Col } from 'react-bootstrap'

const Rate = ({name,rating,comment}) => {
  return (
              <Container className='rate-container'>
            <Row>
                <Col className="d-flex">
                    <div className="sub-tile d-inline p-1 pt-2 ">Rating : </div>
                    <img className="m-1 mt-2" src={rate} alt="" height="20px" width="20px" />
                    <div className="cat-rate  d-inline  p-1 pt-2">4.5</div>
                    {/* <div className="rate-count d-inline p-1 pt-2">Count 10</div> */}
                </Col>
            </Row></Container>

  )
}

export default Rate
