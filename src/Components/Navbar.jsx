import React, { useState } from 'react';
import NavItem from './Dropdown';
import './Components.css';
import ProfileIcon from './ProfileIcon';


const isAuthenticated = sessionStorage.getItem('accessToken');

const Navbar = ({ isLoading, isSubmitting, logOut }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { title: 'Home', value: [] },
    { title: 'About us', value: [] },
    { title: 'Contact us', value: [] },
    { title: 'Gallery', value: [] },
    { title: 'Notices', value: [] },
    {
      title: "Teacher's guide",
      value: [
        {
          label: (
            <a
              href="/entrylevelquestions.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pre-Level School
            </a>
          ),
          key: '0',
        },
        {
          label: 'Primary level',
          key: '1',
          pdfurl: '',
        },
        {
          label: 'Secondary level',
          key: '3',
          disabled: false,
          pdfurl: '',
        },
      ],
    },
    { title: 'Apply now', value: [] },
    isAuthenticated ? { title: 'Admin-Panel', value: [] } : null,
  ];

  return (
    <div className="nav-container" style={{
      zIndex: 1000,
    }}>
      {/* Logo Section */}
      <div className="logo-div">
        <img src="/schoollogo.png" className="logo-img" alt="Logo" />
        <h1 className="logo-title">Your School</h1>
      </div>

      {/* Hamburger Menu */}
      <div
        className="hamburger-menu"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Sidebar for Small Screens */}
      {isSidebarOpen && (
        <div className="sidebar">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="sidebar-item"
              onClick={() => setIsSidebarOpen(false)}
            >
              <NavItem title={item?.title} items={item?.value} />
            </div>
          ))}
        </div>
      )}

      {/* Menu Items for Large Screens */}
      <div className="items-container">
        {menuItems.map((item, index) => (
          <div key={index} className="nav-items">
            <NavItem title={item?.title} items={item?.value} />
          </div>
        ))}
      </div>

      {/* Profile Icon */}
      <div className="profile-icon">
        <ProfileIcon logOut={logOut} />
      </div>
    </div>
  );
};


export default Navbar;
