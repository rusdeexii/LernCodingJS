import React from 'react';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </>
  );
};

export default Layout;
