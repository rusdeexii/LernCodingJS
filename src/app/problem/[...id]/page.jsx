'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CodeInput from '@/app/components/CodeInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";


export default function ProblemDetail() {
  const params = useParams();
  const { id } = params;
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleComplete = () => {
    toast.success('คุณพิมพ์โค้ดเสร็จเรียบร้อยแล้ว!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      className: 'bg-teal-500 text-white',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id && id.length > 0) {
        try {
          setIsLoading(true);
          const response = await fetch('/data/problems.json');
          const data = await response.json();
          const foundProblem = data.find((p) => p.id === parseInt(id[id.length - 1]));
          setProblem(foundProblem);
        } catch (error) {
          console.error('Error fetching problem data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  const getCodeLines = () => {
    if (problem && problem.result) {
      const resultObject = problem.result[0];
      return Object.values(resultObject).map(line => line.replace(/\s+/g, ''));
    }
    return [];
  };

  const getDescriptionLines = () => {
    if (problem && problem.description) {
      const descriptionObject = problem.description[0];
      return Object.values(descriptionObject);
    }
    return [];
  };


  return (
    <div className="min-h-screen to-blue-200 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 sm:p-8 md:p-10 animate-fadeIn">
        {isLoading ? (
          <div className="flex justify-center items-center h-full mt-8">
            <div className="flex flex-row space-x-4 ">
              <div className="w-12 h-12 rounded-full animate-spin border-8 border-dashed border-green-500 border-t-transparent"></div>
            </div>
          </div>
        ) : (
          <>
            <ToastContainer />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-10 text-teal-700">
              Challenge: {problem?.title}
            </h1>
            <div className="prose prose-lg text-slate-700 text-center mb-6 sm:mb-8 md:mb-10 max-w-full">
              <p>{problem?.rong || 'Problem description missing'}</p>
            </div>
            <div className="w-full">
              {problem?.result && (
                <CodeInput
                  lines={getCodeLines()}
                  descriptions={getDescriptionLines()}
                  answer={problem.answer}
                  onComplete={handleComplete}
                />
              )}
            </div>
            <div className="mt-8 flex justify-between items-center">
              <Link href="/" className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-800 text-white font-semibold rounded-lg shadow transition-colors duration-200">
                <PiArrowLeftBold className="mr-2" />
                กลับไปหน้าหลัก
              </Link>
              <Link href={`/problem/${parseInt(id[id.length - 1]) + 1}`} className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-800 text-white font-semibold rounded-lg shadow transition-colors duration-200">
                หน้าถัดไป
                <PiArrowRightBold className="ml-2" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}