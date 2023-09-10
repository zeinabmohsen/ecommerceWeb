import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { login } from '../../connect';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      setSuccess('Login successful!');
      setError('');
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed. Please check your credentials.');
      setSuccess('');
    }
  };

  return (
    <div className='formContainer'>
      <Form className='form' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='mainTitle' htmlFor="formBasicEmail">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='mainTitle' htmlFor="formBasicPassword">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
            title="Password must be at least 8 characters long"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Don't have an account? <Link to="/signUp" className='link'> Sign Up</Link>
          </Form.Label>
        </Form.Group>
        <Button type="submit">Submit</Button>

        {error && (
          <div className="alert alert-danger mt-2">{error}</div>
        )}

        {success && (
          <div className="alert alert-success mt-2">{success}</div>
        )}
      </Form>
    </div>
  );
}

export default Login;
