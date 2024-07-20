'use client';
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [Problems, setProblems] = useState([]);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/data/problems.json');
      const data = await response.json();
      setProblems(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleScroll = () => {
    setIsFixed(window.scrollY > 0);
  };

  const handleProblemClick = (problemId) => {
    setSelectedProblemId(problemId);
    setIsOpen(false);
    router.push(`/problem/${problemId}`);
  };

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentProblemId = pathname.split('/').pop();
    setSelectedProblemId(currentProblemId);
  }, [pathname]);

  return (
    <>
      <nav
        className={`bg-white shadow-md dark:bg-gray-900 ${isFixed ? 'fixed top-0 left-0 w-full z-40' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  src="/img/logo.png"
                  className="h-8 w-auto sm:h-10"
                  alt="Logo"
                />
                <h2 className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
                  Devmour.
                </h2>
              </Link>
            </div>
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <GiHamburgerMenu className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div 
          className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeSidebar}
        ></div>

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div 
            className={`w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-4xl font-bold text-gray-900" id="slide-over-title">
                    Challenges 💎
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      onClick={toggleSidebar}
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">Close panel</span>
                      <FaTimes className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    {Problems.map((problem) => (
                      <div key={problem.id} className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                        <button 
                          onClick={() => handleProblemClick(problem.id)}
                          className={`block w-full px-4 py-2 mt-2 text-lg font-semibold text-left rounded-lg ${
                            selectedProblemId === problem.id
                              ? 'bg-green-500 text-white'
                              : 'bg-transparent hover:bg-green-500 hover:text-white'
                          } dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
                        >
                          {problem.title}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;