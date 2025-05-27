import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/home/Homepage';
import Login from './pages/login/Login';
import AboutUs from './pages/about-us/Aboutus';
import Example from './pages/Example';
import ApplyNow from './pages/apply-now/Applynow';
import ContactUs from './pages/contact-us/Contactus';
import Gallery from './pages/gallery/Gallery';
import Notices from './pages/notices/Notices';
import Posts from './pages/posts/Posts';
import PostDetails from './pages/posts/Postdetails';
import Admin from './pages/admin/Admin';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const isAuthenticated = sessionStorage.getItem('accessToken');

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/example" element={<Example />} />
        <Route path="/applynow" element={<ApplyNow />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/all-posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route
          path="/admin"
          element={!isAuthenticated ? <Admin /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
