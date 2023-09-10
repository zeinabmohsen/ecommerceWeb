// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { addItemToCart  , useAuthentication} from '../../connect'; // Import the correct function from '../../connect'

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { isAuthenticated,userId, addTokenToHeaders } = useAuthentication();
const headersWithToken = addTokenToHeaders();

  useEffect(() => {
    console.log('Fetching product details for productId:', productId);

    // Make a GET request to fetch product details based on productId
    fetch(`http://localhost:3001/api/v1/product/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Received product data:', data);
        setProduct(data);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCart = () => {
    if (isAuthenticated) {
      // Assuming you have productId defined somewhere
      addItemToCart(userId, productId, 1,headersWithToken); // Pass the userId and product ID
    }
  };

  

  return (
    <div>
      <Row>
        <Col xs={12} lg={4} style={{ width: '18rem', height: '30rem' }}>
          <Card.Img src={`http://localhost:3001${product.image_url}`} alt={product.name}  />
        </Col>
        <Col xs={12} lg={8} className='d-flex justify-content-center flex-column'>
          <div className="mainTitle">Details</div>
          <p>{product.description}</p>
          <div className="mainTitle">Brand</div>
          <p>{product.brand}</p>
          <div className="mainTitle">Price</div>
          <p>{product.price}</p>
          {/* Add an onClick handler to the Button */}
          <div>
            {
              isAuthenticated ? (
                <Button onClick={addToCart}>Add to cart</Button>
              )
            :(
              <>
              <Button onClick={addToCart} disabled>Add to cart</Button>
              <p>You are not logged in</p>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails; // Export the component


