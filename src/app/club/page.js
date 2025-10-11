"use client";
import React from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRevealer } from '../components/template/useRevealer';

const ClubPage = () => {
  useRevealer();

  return (
    <ReactLenis root>
      <div className="text-black">
        <div className="revealer fixed top-0 left-0 w-screen h-screen origin-top bg-black pointer-events-none z-100"></div>
        <div className="p-4 sm:p-6">
          <Navbar />
        </div>
        
        {/* Hero Section */}
        <div className="px-6 md:px-8 mt-20 md:mt-32">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-24 md:mb-32 gap-6 sm:gap-0">
            <h1 className="text-6xl sm:text-7xl md:text-9xl xl:text-[200px] font-bold leading-none tracking-tight">
              Club
            </h1>
            <div className="flex items-start gap-3">
              <span className="text-6xl sm:text-7xl md:text-9xl xl:text-[200px] font-bold leading-none tracking-tight">
                2025
              </span>
            </div>
          </div>

          {/* About Section */}
          <div className="grid md:grid-cols-2 gap-16 md:gap-32 mb-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">About us</h2>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed">
                What makes us unique is not our debate skills, speech abilities, 
                or even our communication techniques. It&apos;s our team members that 
                truly make UESC one of the best clubs around. We&apos;ve been a student 
                organization and have been through a lot together since the start. 
                We understand the importance of genuine human connections.
              </p>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="w-full h-96 bg-gray-400 rounded-lg mb-20">
            {/* This would be your actual image */}
          </div>

          {/* Activities Section */}
          <div className="py-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-12 text-center">Our Activities</h2>
            <p className="text-lg md:text-xl text-center mb-16 max-w-3xl mx-auto leading-relaxed">
              UESC offers a variety of activities designed to improve your English skills 
              in a fun and supportive environment. Explore our divisions and find the one 
              that&apos;s right for you!
            </p>
          </div>
        </div>
      </div>

      <Footer/>
    </ReactLenis>
  );
};

export default ClubPage;
