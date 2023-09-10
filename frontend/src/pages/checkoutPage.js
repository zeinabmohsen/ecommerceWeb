import React, { useState } from 'react';
import { Col, Container, Form, Row, Button, Modal } from 'react-bootstrap';
import SubTitle from '../components/general/subTitle';
import { placeOrder, useAuthentication } from '../connect';

const Checkout = () => {
  const { userId ,addTokenToHeaders} = useAuthentication();
  const headersWithToken = addTokenToHeaders();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    email: '',
    phone_number: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await placeOrder(userId, headersWithToken, formData);
      console.log('Order submitted:', response);
      setShowModal(true);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Container style={{minHeight:"620px"}}>
      <SubTitle mainTitle={'Checkout'} />
      <Row>
        <Col lg={7}>
          <p>Billing details</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 d-flex gap-3" controlId="checkout">
              <div>
                <Form.Label>First Name</Form.Label>
                <Form.Control type='text' placeholder="Zeinab" name="first_name" onChange={handleInputChange} required />
              </div>
              <div>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type='text' placeholder="Mohsen" name="last_name" onChange={handleInputChange} required />
              </div>
            </Form.Group>
            <p>Country / Region</p>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder="enter your address" name="address" onChange={handleInputChange} required />
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder="enter your email" name="email" onChange={handleInputChange} required />
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type='Phone' placeholder="enter your number" name="phone_number" onChange={handleInputChange} required />
            <Button type="submit" onClick={toggleModal}>
              Submit Order
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your order has been placed successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Checkout;








