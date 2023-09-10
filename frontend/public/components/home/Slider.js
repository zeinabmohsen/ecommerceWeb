import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

function CarouselFade() {
    const [index,setIndex]=useState(1)
    const handleSelect = (selectedIndex)=>{
        setIndex(selectedIndex)
    }
  return (
    <Carousel fade activeIndex={index} onSelect={handleSelect}> 
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../1.svg"
          alt="slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../2.svg"
          alt="slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFade;
