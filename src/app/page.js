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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(indexOfFirstProblem, indexOfLastProblem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const totalPages = Math.ceil(problems.length / problemsPerPage);

  return (
    <div className="min-h-screen p-8">
      <div className='text-center mb-12 animate-fadeIn'>
        <h1 className="text-5xl font-bold ">ฝึก Coding ด้วยการพิมพ์ </h1>
        <h3 className='text-lg mt-2'>ฝึกทักษะการเขียนโค้ดผ่านการพิมพ์แบบโต้ตอบ มาพิมพ์ตามและเรียนรู้แนวคิดการเขียนโปรแกรมแบบลงมือทำกัน !</h3>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full mt-8">
          <div className="flex flex-row space-x-4 ">
            <div className="w-12 h-12 rounded-full animate-spin border-8 border-dashed border-green-500 border-t-transparent"></div>
          </div>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {currentProblems.map(problem => (
              <li key={problem.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105" data-aos="fade-up">
                <img src={problem.image} alt={problem.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-teal-600 mb-2">{problem.title}</h2>
                  <p className="text-gray-600 mb-4">{problem.rong}</p>
                  <Link href={`/problem/${problem.id}`}>
                    <button className="w-full bg-green-500 hover:bg-green-800  text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center  duration-300">
                      <MdNotStarted className='mr-2'/>เริ่มทำ
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center justify-center gap-4 mt-12">
            <button 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-teal-700 bg-white rounded-lg shadow transition-all duration-300 hover:bg-teal-50 disabled:opacity-50"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
              </svg>
              ก่อนหน้า
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`h-10 w-10 rounded-lg text-center text-sm font-medium transition-all duration-300 ${
                    currentPage === number + 1
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'bg-white text-teal-700 hover:bg-teal-50'
                  }`}
                  type="button"
                >
                  {number + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-teal-700 bg-white rounded-lg shadow transition-all duration-300 hover:bg-teal-50 disabled:opacity-50"
              type="button"
            >
              ถัดไป
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}