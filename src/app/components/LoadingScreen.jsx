"use client";
import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    document.body.classList.add('loading');
    
    // Simple loading timer - show for 2 seconds
    const loadingTimer = setTimeout(() => {
      setIsExiting(true);
      
      // Wait for exit animation to complete
      setTimeout(() => {
        setIsLoading(false);
        // Re-enable scrolling and scroll to top
        document.body.style.overflow = 'auto';
        document.body.classList.remove('loading');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 500);
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
      // Cleanup: re-enable scrolling if component unmounts
      document.body.style.overflow = 'auto';
      document.body.classList.remove('loading');
    };
  }, [onLoadingComplete]);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black z-50 flex flex-col justify-end p-6 transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex justify-between items-end w-full">
        <span className="text-white text-6xl font-bold uppercase">UESC</span>
        <div className="text-white text-2xl">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;