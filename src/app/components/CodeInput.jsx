'use client';
import React, { useState, useEffect } from 'react';

const CodeInput = ({ lines, onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const currentCode = lines[currentLine];
    const currentChar = currentCode[currentCharIndex];

    if (value === currentChar) {
      setInput('');
      setCurrentCharIndex(currentCharIndex + 1);
      setIsCorrect(true);

      if (currentCharIndex + 1 === currentCode.length) {
        if (currentLine + 1 === lines.length) {
          onComplete();
        } else {
          setCurrentLine(currentLine + 1);
          setCurrentCharIndex(0);
        }
      }
    } else if (currentCode.startsWith(value)) {
      setInput(value);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  useEffect(() => {
    setInput('');
    setIsCorrect(true);
  }, [currentLine, currentCharIndex]);

  return (
    <div className="flex flex-col items-center">
      {lines.map((line, index) => (
        <div key={index} className="flex">
          {line.split('').map((char, charIndex) => (
           <span
           key={charIndex}
           className={
             index === currentLine && charIndex === currentCharIndex
               ? 'blinking underline'
               : ''
           }
           style={{
             color: index === currentLine && char === input ? 'green' : '',
             color: index === currentLine && charIndex === currentCharIndex && !isCorrect ? 'red' : '',
           }}
         >
           {char}
         </span>
         
          ))}
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className={`opacity-0 absolute ${isCorrect ? 'border-black' : 'border-red-500'}`}
        autoFocus
      />
    </div>
  );
};

export default CodeInput;
