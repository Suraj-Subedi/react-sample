import React from 'react';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-logo">YOUR SCHOOL LOGO</div>
      <div className="footer-contact">
        <h3>Contact Us</h3>
        <ul>
          <li>
            <MdEmail /> shangrilainternation@gmail.com
          </li>
          <li>
            <FaPhoneSquareAlt /> +977-9812345678 / 01-657847
          </li>
          <li>
            <IoLocationSharp /> Chapagaun, Lalitpur
          </li>
        </ul>
      </div>
      <div className="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Twitter</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
