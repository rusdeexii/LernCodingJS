'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MdNotStarted } from "react-icons/md";

export default function Home() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 8;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    const fetchData = async () => {
      try {
        const response = await fetch('/data/problems.json');
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get current problems
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(indexOfFirstProblem, indexOfLastProblem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(problems.length / problemsPerPage);

  return (
    <div className="p-8">
      <h1 className="text-5xl font-bold text-center mb-8">ฝึก Programming ด้วยการพิมพ์ 🃏</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-full mt-8">
          <div className="flex flex-row space-x-4 ">
            <div className="w-12 h-12 rounded-full animate-spin border-8 border-dashed border-green-500 border-t-transparent"></div>
          </div>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 xl:grid-cols-4 gap-y-10 gap-x-6 items-start">
            {currentProblems.map(problem => (
              <li key={problem.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start" data-aos="fade-up">
                <div className="order-1 sm:ml-6 xl:ml-0">
                  <h3 className="mb-1 text-slate-900 font-semibold"></h3>
                  <h2 className="mb-1 block leading-6 text-xl font-semibold text-indigo-500">{problem.title}</h2>
                  <div className="prose prose-slate prose-sm text-slate-600">
                    <p>{problem.rong}</p>
                  </div>
                  <Link href={`/problem/${problem.id}`}>
                    <button className="mt-4 bg-green-500 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg flex items-center"><MdNotStarted className='mr-1'/>เริ่มทำ</button>
                  </Link>
                </div>
                <img src={problem.image} alt={problem.title} className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" />
              </li>
            ))}
          </ul>
          
          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-6 py-3  text-sm font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
              </svg>
              ก่อนหน้า
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle text-sm font-medium uppercase transition-all ${
                    currentPage === number + 1
                      ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20'
                      : 'text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20'
                  }`}
                  type="button"
                >
                  <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    {number + 1}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-6 py-3  text-sm font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              ถัดไป
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}