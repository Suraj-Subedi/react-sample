import React, { useMemo, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import Loader from './Components/Loader';
import { useLocation } from 'react-router-dom';

const Layout = ({ children, isLoading, isSubmitting, notifications }) => {
  const contextValue = useMemo(
    () => ({
      name: 'Message',
    }),
    []
  );

  const location = useLocation();
const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="layout">
      <React.Suspense fallback={<Loader mode="fullscreen" />}>
        {isAdminRoute ? (
          <main className="main-container">{children}</main>
        ) : (
          <>
            <ScrollToTop />
            <Navbar />
            <main className="main-container">{children}</main>
            <Footer />
          </>
        )}
      </React.Suspense>
    </div>
  );
};

export default Layout;
