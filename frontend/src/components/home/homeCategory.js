import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SubTitle from '../general/subTitle';
import Card from '../general/categoryCard';
import axios from 'axios';

const HomeCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3001/api/v1/category') 
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div>
      <Container>
        <SubTitle mainTitle={"Categories"} title={"Browse By Category"}/>
        <Card categories={categories}/>
      </Container>
    </div>
  );
}

export default HomeCategory;
