import React from 'react'
import { Table } from 'react-bootstrap'
import {useAuthentication, useCartData,} from '../../connect'
const Cart = () => {
  const { userId ,addTokenToHeaders} = useAuthentication();
  const headersWithToken = addTokenToHeaders();
  const CartData=useCartData(userId,headersWithToken)
  return (
    <div >
        <Table responsive="sm">
        <thead>
          <tr >
            <th className='mainTitle'>Product</th>
            <th className='mainTitle'>Price</th>
            <th className='mainTitle'>Quantity</th>
            <th className='mainTitle'>Subtotal</th>
          </tr>
        </thead>
        <tbody>
            {CartData.length > 0 ? (
  CartData.map((item, index) => (
    <tr key={index}>
      <th>{item.name}</th>
      <th>{item.price}</th>
      <th>{item.quantity}</th>
      <th>{item.quantity * item.price}</th>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="4">No items in the cart</td>
  </tr>
)}
        </tbody>
        </Table>
    </div>
  )
}

export default Cart
