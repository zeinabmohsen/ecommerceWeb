import React from 'react';
import SubTitle from '../components/general/subTitle';
import ProductCard from '../components/general/productCard';
 import Paginate from '../components/general/paginate';
import HomeCategory from '../components/home/homeCategory';
import { Container } from 'react-bootstrap';

const Product = () => {
  return (
    <>
      <HomeCategory />
      <Container>
        <SubTitle mainTitle={"All products"} title={" "} />
        <ProductCard />
        <Paginate/>
      </Container>
    </>
  );
};

export default Product;
