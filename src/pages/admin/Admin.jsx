import React, { useState, useEffect } from 'react';
import './Admin.css';


import PostForm from './PostForm';
import Dashboard from './Dashboard';
import NoticesUpload from './NoticesUpload';

import ApproveRegistration from './ApproveRegistration';
import ChangePassword from './ChangePassword';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import Navbar from '../../Components/Navbar';
import AdminInquiries from '../../Components/Admin/AdminInquiries';
import AdminNotices from '../../Components/Admin/AdminNotices';



const Admin = ({ me, permissions, fetchPermission }) => {
    const searchParams = useSearchParams();
    const navigate = useNavigate();
  const [page, setPage] = useState(searchParams[0].get('page') || 'dashboard');



  const routes = [
    {
      pageName: 'Dashboard',
      component: <Dashboard />,
      key: 'dashboard',
      icon: <RxDashboard size={24} />
    },
    {
      pageName: 'Inquiries',
      component: <AdminInquiries/>,
      key: 'inquiries',
      icon: <MdOutlineLibraryBooks size={24} />

    },
    {
      pageName: 'Notices',
      component: <AdminNotices/>,
      key: 'notices',
      icon: <MdOutlineLibraryBooks size={24} />
    },

    {
      pageName: 'Settings',
      component: <ChangePassword />,
      key: 'settings',
      icon: <IoSettingsOutline  size={24} />

    },
  ];


  return (
    <>
    <Navbar/>
    <div className="admin-container">

      <div className="sidebar" style={{
        zIndex:100,
        paddingTop: '80px',
      }}>


        <ul className="sidebar-menu" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '0',
          marginTop: '20px',
          listStyleType: 'none',
        }}>
          {routes.map((route) => (
            <div
            className='sidebar-items'
             onClick={() =>{
               setPage(route.key)
                navigate(`/admin?page=${route.key}`);
             }}
            style={
              {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '5px 20px',
                cursor: 'pointer',
                borderRadius: '5px',
                backgroundColor: page === route.key ? '#fffff' : 'transparent',
                transition: 'background-color 0.3s ease',
                boxShadow: page === route.key ? '0 2px 4px rgba(0, 0, 0, 0.3)' : 'none',
              }
            }>
              {route.icon}

            <span
              key={route.key}
              style={{
                fontSize: '16px',
                fontWeight: page === route.key ? 'bold' : 'normal',
                color: page === route.key ? '#000' : '#555'
              }}
              className={`sidebar-item ${page === route.key ? 'active' : ''}`}

            >
              {route.pageName}
            </span>
                     </div>
          ))}
        </ul>
      </div>

      <div className="main-page" style={{
        padding: '24px',
        backgroundColor: '#f9f9f9',
      }}>
        {
          routes.map((route) => (
            <>
              {page === route.key && (
                  route.component
              )}
            </>
          ))
        }


      </div>
    </div>
    </>
  );
};


export default Admin;
