import React from 'react';
import './Aboutus.css';
import { FaQuoteLeft } from 'react-icons/fa'; // For testimonial quotes

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h2 className="aboutus">ABOUT US</h2>

      <p align="justify" className="aboutus-title">
        The basic purpose of narrative is to entertain, to gain and hold
        readers' interest. However, narratives can also be written to teach or
        inform, to change attitudes/social opinions. Narratives sequence
        people/characters in time and place but differ from recounts in that
        through the sequencing, the stories set up one or more problems, which
        must eventually find a way to be resolved.
      </p>

      <h2 className="vision-mission">Our Vision & Mission</h2>

      <div className="aboutus-main">
        <p className="vision-mission-paragraph" align="justify">
          Our school's mission is to learn leadership, the common core, and
          relationships for life. Our mission is to provide a safe, disciplined
          learning environment that empowers all students to develop their full
          potential.
          <br />
          <br />- Shree Kali Devi Secondary School
        </p>

        <div className="Namaste">
          <img
            src="./post3.jpg"
            className="vision-mission-img"
            alt="School Event"
          />
        </div>
      </div>

      <div className="testimonials">
        <h2>What Our Students Say</h2>
        <div className="testimonial-card">
          <FaQuoteLeft className="testimonial-icon" />
          <p className="testimonial-text">
            "Shree Kali Devi Secondary School is where I discovered my true
            potential. The learning environment is nurturing, and the teachers
            are always supportive."
          </p>
          <span className="testimonial-author">- Student Name</span>
        </div>
      </div>

      <div className="image-gallery">
        <h2>Gallery</h2>
        <div className="image-slider">
          <img src="./post1.jpg" alt="Gallery 1" />
          <img src="./post2.jpg" alt="Gallery 2" />
          <img src="./post3.jpg" alt="Gallery 3" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
