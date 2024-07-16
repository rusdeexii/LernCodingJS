'use client';
import React, { useState, useEffect } from 'react';

const CodeInput = ({ lines, onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\s+/g, '');
    const currentCode = lines[currentLineIndex].replace(/\s+/g, '');

    if (currentCode.startsWith(value)) {
      setInput(value);
      setIsCorrect(true);

      if (value === currentCode) {
        setInput('');
        setCurrentLineIndex(currentLineIndex + 1);
        if (currentLineIndex + 1 === lines.length) {
          onComplete();
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

  return (
    <div className="flex flex-col items-center">
      <div className="flex text-2xl md:text-3xl lg:text-4xl">
        {lines[currentLineIndex].split('').map((char, charIndex) => (
          <span
            key={charIndex}
            className={`${
              charIndex === input.length ? 'blinking underline' : ''
            } ${charIndex < input.length ? 'text-green-500' : ''} ${
              charIndex === input.length && !isCorrect ? 'text-red-500' : ''
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
    </div>
  );
};

export default CodeInput;
