'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CodeInput from '@/app/components/CodeInput';

export default function ProblemDetail() {
  const params = useParams();
  const { id } = params;
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleComplete = () => {
    alert('You have completed typing the code!');
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

  return (
    <div className="flex flex-col items-center h-screen p-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-full mt-4">
          <div className="w-12 h-12 rounded-full animate-spin border-8 border-dashed border-green-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          <h1 className="text-6xl font-bold text-center mb-8">Challenge: {problem?.title}</h1>
          <div className="prose prose-slate prose-lg text-slate-600 text-center mb-8">
            <p>{problem?.description}</p>
          </div>
          <div>
            <h1 className="text-center mb-6">พิมพ์ตามโค้ดด้านล่างนี้ได้เลย!:</h1>
            {problem?.result && (
              <CodeInput lines={getCodeLines()} onComplete={handleComplete} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
