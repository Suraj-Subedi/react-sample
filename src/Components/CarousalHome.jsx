import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  width: '100%',
  height: '100%',
};

const CarouselHome = () => (
  <>
    <Carousel arrows infinite={true} autoplay={true} autoplaySpeed={2000}>
      <div style={{ width: '100%' }}>
        <img src="/school1.jpg" alt="preview" className="carousal-img" />
      </div>
      <div style={{ width: '100%' }}>
        <img src="/post1.jpg" className="carousal-img" />
      </div>
      <div style={{ width: '100%' }}>
        <img src="/post4.jpg" className="carousal-img" />
      </div>
    </Carousel>
  </>
);
export default CarouselHome;
