'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CodeInput from '@/app/components/CodeInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProblemDetail() {
  const params = useParams();
  const { id } = params;
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleComplete = () => {
    toast.success('คุณพิมพ์โค้ดเสร็จเรียบร้อยแล้วว!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
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
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 md:p-8">
      <ToastContainer />
      {isLoading ? (
        <div className="flex justify-center items-center h-full mt-4">
          <div className="w-12 h-12 rounded-full animate-spin border-8 border-dashed border-green-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8">
            Challenge: {problem?.title}
          </h1>
          <div className="prose prose-sm sm:prose-base md:prose-lg text-slate-600 text-center mb-4 sm:mb-6 md:mb-8 max-w-full px-4">
            <p>{problem?.rong || 'Problem description missing'}</p>
          </div>
          <div className="w-full max-w-3xl">
            {problem?.result && (
              <CodeInput 
                lines={getCodeLines()} 
                descriptions={getDescriptionLines()}  
                answer={problem.answer} 
                onComplete={handleComplete} 
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}