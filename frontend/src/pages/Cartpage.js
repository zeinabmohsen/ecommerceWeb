import React from 'react'
import Cart from '../components/Cart/cart'
import {  Container , Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const Cartpage = () => {
  return (
    <div style={{minHeight:"600px"}}>
    <Container>
      <Cart />
      <div  lg={3} className='d-flex justify-content-end '>
      <Link to="/checkout"><Button > Check Out</Button></Link></div>
    </Container></div>
  )
}

export default Cartpage
