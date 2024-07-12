'use client';
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import Link from 'next/link';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false); // State for fixed navbar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to detect scroll and update fixed state
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  // Add scroll event listener on component mount and remove on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`bg-gray-200 border-gray-400 py-2.5 dark:bg-gray-900 ${
        isFixed ? 'fixed top-0 left-0 w-full z-50' : ''
      }`}
    >
      <div className="flex flex-wrap items-center justify-between max-w-screen-2xl px-4 mx-auto mt-2 ">
        <Link href="/" className="flex items-center">
          <img
            src="/img/icon.png"
            className="h-6 mr-3 sm:h-10 mb-2"
            alt="Logo"
          />
          <h2 className="self-center text-2xl font-bold whitespace-nowrap mb-2">
            Devmour.
          </h2>
        </Link>
        <div className="flex items-center lg:order-2">
          <div className="hidden mt-2 mr-4 sm:inline-block">
            {/* Additional menu items here (optional) */}
          </div>
          <button onClick={toggleSidebar} className="focus:outline-none">
            {isOpen ? (
              <FaTimes size={30} className="border-gray-500" />
            ) : (
              <GiHamburgerMenu size={30} className="border-gray-500 mb-2" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div >
         
        </div>
      )}
    </nav>
  );
}

export default NavBar;
