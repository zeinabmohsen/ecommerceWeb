import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function BasicExample({ product }) {
    return (
      <Row className='d-flex justify-content-between'>
        {product.map((prod) => (
          <Col key={prod.id} xs={12} sm={6} md={6} lg={3} className='d-flex justify-content-center pb-2'>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="../../dress.jpg" width="100px" height="180px" />
              <Card.Body>
                <Card.Title>{prod.name}</Card.Title>
                <Card.Text>
                  {prod.pr}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
  
export default BasicExample;

