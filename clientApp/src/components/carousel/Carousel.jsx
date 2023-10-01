import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './carousel.scss';

function CarouselSlider({ img1, img2 }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <div className="carousel-image-container">
          <img className="carousel-image" src={img1} alt="Primera imagen" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image-container">
          <img className="carousel-image" src={img2} alt="Segunda imagen" />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselSlider;
