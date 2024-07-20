'use client'
import React, { useState, useEffect } from 'react'
import '../globals.css'
import { MdAdsClick } from "react-icons/md";
import Link from 'next/link';

function ReviewCommon() {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setIsExpanded(true);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        className={`review-card relative flex flex-col text-gray-700 bg-white bg-opacity-70 backdrop-blur-md rounded-xl
                    ${isExpanded ? 'w-64 h-auto' : 'w-16 h-16 overflow-hidden cursor-pointer'}`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="wave-animation"></div>
        </div>
        {!isExpanded && (
          <div className="flex items-center justify-center w-full h-full relative z-10">
            <img src='/img/rating.png' className='w-10 h-10 icon-bounce' alt="Rating" />
          </div>
        )}
        {isExpanded && (
          <>
            <div className="p-4 relative z-10">
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-shimmer block text-lg font-bold text-blue-gray-900">
                  เขียน Feedback ที่นี่
                  <img src='/img/rating.png' className='w-6 h-6 inline-block ml-2 icon-bounce' alt="Rating" />
                </h5>
                <button onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="block text-sm">
                กรอกแบบฟอร์มของเราเพื่อที่จะนำไปปรับปรุงแก้ไขและพัฒนาระบบให้ได้รับประสบการณ์ต่อผู้ใช้ให้ดียิ่งขึ้น
              </p>
            </div>
            <div className="p-4 pt-0 relative z-10">
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdgriRAKppSPWMHOE5rvXs-pydqIqpc3855QU8r6Q_v1mE3Kw/viewform?usp=sf_link" className="inline-block w-full">
                <button
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 text-lg font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  type="button">
                  คลิ๊กเลย
                 <MdAdsClick />
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ReviewCommon