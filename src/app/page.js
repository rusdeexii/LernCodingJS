'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

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

  return (
    <div className="p-8">
      <h1 className="text-5xl font-bold text-center mb-8">ฝึก Coding ด้วยการพิมพ์</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-full mt-4">
          <div className="flex flex-row space-x-4 ">
            <div className="w-12 h-12 rounded-full animate-spin border-8 border-dashed border-green-500 border-t-transparent"></div>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 xl:grid-cols-4 gap-y-10 gap-x-6 items-start">
          {problems.map(problem => (
            <li key={problem.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start" data-aos="fade-up">
              <div className="order-1 sm:ml-6 xl:ml-0">
                <h3 className="mb-1 text-slate-900 font-semibold"></h3>
                <h2 className="mb-1 block leading-6 text-xl font-semibold text-indigo-500">{problem.title}</h2>
                <div className="prose prose-slate prose-sm text-slate-600">
                  <p>{problem.description}</p>
                </div>
                <Link href={`/problem/${problem.id}`}>
                  <button className="mt-4 bg-green-500 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg">เริ่มทำ</button>
                </Link>
              </div>
              <img src={problem.image} alt={problem.title} className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
