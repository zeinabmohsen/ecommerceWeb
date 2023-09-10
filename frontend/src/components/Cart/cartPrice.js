import React from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const cartPrice = () => {
  return (
      <Card className='p-3'>
      <Table responsive="sm">
        <thead>
          <tr>
            <th className='mainTitle'>Cart totals</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <th>Subtotal</th>
                <th>234$</th>
            </tr>
            <tr>
                <th>Shipping</th>
                <th>Flat rate: {"3$"}</th>
            </tr>
            <tr>
                <th>Total</th>
                <th>$39.43</th>
            </tr>
        </tbody>
        </Table>
        <Link to="/checkout"><Button > Check Out</Button></Link>
      </Card>
  )
}

export default cartPrice

