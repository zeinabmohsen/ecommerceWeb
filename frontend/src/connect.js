import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from 'react';

const apiUrl = 'http://localhost:3001/api/v1/cart';

export const addItemToCart = async (userId, product_id, quantity, headers) => {
  try {
    const response = await axios.post(apiUrl, {
      userId,
      product_id,
      quantity,
    }, { headers });

    console.log(response.data);
  } catch (error) {
    console.log('User is authenticated with userId:', userId);
    console.log(error)
  }
};

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      setIsAuthenticated(false);
    } else {
      try {
        const decoded = jwt_decode(storedToken);
        console.log('Decoded Token:', decoded);
        setToken(storedToken);
        setUserId(decoded.userId);
        console.log('Decoded id:', decoded.userId);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserId(null);
      }
    }
  }, []);
  const addTokenToHeaders = (headers = {}) => {
    if (token) {
      return {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return headers;
  };

  return {
    isAuthenticated,
    userId,
    addTokenToHeaders,
  };
};

export async function login(email, password) {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/login', {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.setItem('token', token);
    console.log('Login successful', response.data);
    return response.data;
  } catch (error) {
    console.error('Login failed', error.response.data);
    throw error;
  }
}


export async function signup(username, email, password) {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/signup', {
      username,
      email,
      password,
    });
    console.log('Signup successful', response.data);
    const { token } = response.data;
console.log('Stored Token:', token);
localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error('Signup failed', error.response.data);
    throw error;
  }
}

export function useProductData() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/product')
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return productData;
}


export function useCartData(userId, headers) {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/cart/${userId}`, {
      headers: headers, 
    })
      .then((response) => {
        setCartData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching carts:', error);
      });
  }, [userId, headers]);

  return cartData;
}

export async function placeOrder(userId, headers, formData) {
  try {
    console.log(formData)
    const response = await axios.post(
      `http://localhost:3001/api/v1/order`,
      formData,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


export { useAuthentication };