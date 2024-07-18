'use client';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa";

const CodeInput = ({ lines, descriptions, onComplete, answer }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedLines, setCompletedLines] = useState([]);
  const [completedDescriptions, setCompletedDescriptions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\s+/g, '');
    const currentCode = lines[currentLineIndex]?.replace(/\s+/g);

    if (currentCode && currentCode.startsWith(value)) {
      setInput(value);
      setIsCorrect(true);

      if (value === currentCode) {
        setInput('');
        setCompletedLines([...completedLines, currentCode]);
        setCompletedDescriptions([...completedDescriptions, descriptions[currentLineIndex]]);
        if (currentLineIndex + 1 === lines.length) {
          setIsCompleted(true);
          onComplete();
        } else {
          setCurrentLineIndex(currentLineIndex + 1);
        }
      }
    } else {
      setIsCorrect(false);
    }
  };

  useEffect(() => {
    setInput('');
    setIsCorrect(true);
  }, [currentLineIndex]);

  const handleRunClick = () => {
    setShowAnswer(true);
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center text-center w-full max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-6">
          ยินดีด้วย 🎉 คุณได้ผ่านการพิมพ์เสร็จสมบูรณ์แล้ว ลองรันโค้ดดูสิ !!
        </h2>
        <button
          className="mt-4 bg-green-500 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleRunClick}
        >
          run เพื่อดูคำตอบ <FaCheckCircle className="ml-2" />
        </button>
        {showAnswer && (
          <div className="mt-6 w-full">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">คำตอบ:</h3>
            <p className="mt-2 text-base sm:text-lg md:text-xl bg-gray-100 p-4 rounded-lg break-words">
              {answer}
            </p>
          </div>
        )}
        {completedLines.length > 0 && (
          <div className="mt-8 w-full">
            <h3 className="text-lg font-semibold mb-2">โค้ดของคุณทั้งหมด:</h3>
            <div className="bg-[#1e1e1e] p-4 rounded-lg text-[#d4d4d4] font-mono">
              {completedDescriptions.map((description, index) => (
                <div key={`line-${index}`} className="mb-4">
                  <p className="text-[#6A9955] text-sm">// {description}</p>
                  <pre className="text-[#9cdcfe] text-base mt-1">
                    <span className="text-[#569cd6]">
                      {completedLines[index].split('(')[0]}
                    </span>
                    <span className="text-[#d4d4d4]">
                      ({completedLines[index].split('(')[1] || ''})
                    </span>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div>
        <p className="flex text-xl md:text-xl lg:text-xl">💡: {descriptions[currentLineIndex]}</p>
      </div>
      <div className="flex flex-wrap justify-start text-2xl md:text-3xl lg:text-4xl text-gray-400 mt-4">
        {lines[currentLineIndex]?.split('').map((char, charIndex) => (
          <span
            key={charIndex}
            className={`${charIndex === input.length ? 'blinking' : ''
              } ${charIndex < input.length ? 'text-green-500' : ''} ${charIndex === input.length && !isCorrect ? 'text-red-500' : ''
              }`}
          >
            {char}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className={`absolute opacity-0 text-4xl ${isCorrect ? 'border-black' : 'border-red-500'}`}
        autoFocus
      />
      {completedLines.length > 0 && (
        <div className="mt-8 w-full">
          <h3 className="text-lg font-semibold mb-2">โค้ดของคุณ:</h3>
          <div className="bg-[#1e1e1e] p-4 rounded-lg text-[#d4d4d4] font-mono">
            {completedDescriptions.map((description, index) => (
              <div key={`line-${index}`} className="mb-4">
                <p className="text-[#6A9955] text-sm">// {description}</p>
                <pre className="text-[#9cdcfe] text-base mt-1">
                  <span className="text-[#569cd6]">
                    {completedLines[index].split('(')[0]}
                  </span>
                  <span className="text-[#d4d4d4]">
                    ({completedLines[index].split('(')[1] || ''})
                  </span>
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeInput;