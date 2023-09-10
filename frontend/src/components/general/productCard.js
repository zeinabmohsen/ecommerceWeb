import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useProductData } from '../../connect';
import Fav from '../../images/fav-off.png';

function ProdCard() {
  const productData = useProductData();

  return (
    <Row className='d-flex justify-content-between'>
      {productData.map((prod) => (
        <Col key={prod.id} xs={12} sm={6} md={6} lg={4} className='d-flex justify-content-center pb-2' style={{ width: '18rem', height: '20rem' }}>
          <Card>
            <Link to={`/products/${prod.id}`}>
              <Card.Img src={`http://localhost:3001${prod.image_url}`} alt={prod.name} /> {/* Use prod.image as the src */}
            </Link>
            <Card.Body>
              <Card.Title>{prod.name}</Card.Title>
              <div className='d-flex justify-content-between'>
                <div>{prod.price}</div>
                <div><img src={Fav} alt="Favorite" width="50%" /></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ProdCard;

