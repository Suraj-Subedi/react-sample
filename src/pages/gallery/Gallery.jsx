import React, { useState } from 'react';
import './Gallery.css';

const galleryData = {
  Events: [
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
  ],
  'Annual Program': [
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
  ],
  Festival: [
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
  ],
  'Sports Week': [
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
    '/post2.jpg',
    '/post1.jpg',
    '/post3.jpg',
    '/post4.jpg',
  ],
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('Events');

  return (
    <div className="main-gallery-container">
      <div className="gallery-container">
        <h1 className="gallery-title">Photo Gallery</h1>
        {/* Buttons for Categories */}
        <div className="gallery-buttons">
          {Object.keys(galleryData).map((category) => (
            <button
              key={category}
              className={`gallery-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Display Photos */}
        <div className="gallery-grid">
          {galleryData[selectedCategory].map((image, index) => (
            <div key={index} className="gallery-item">
              <img
                src={image}
                alt={`Gallery ${index}`}
                className="gallery-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
