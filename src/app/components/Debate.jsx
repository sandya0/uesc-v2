"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Debate = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageLeftRef = useRef(null);
  const imageRightRef = useRef(null);

  useGSAP(() => {
    // Set initial states
    gsap.set(titleRef.current, { opacity: 0, y: 40 });
    gsap.set([imageLeftRef.current, imageRightRef.current], { opacity: 0 });

    // Title animation on scroll
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.7,
          stagger: 0.2,
        });
      }
    });

    // Image animations with delay
    gsap.to(imageLeftRef.current, {
      opacity: 1,
      ease: "power3.out",
      duration: 1,
      delay: 0.3,
      stagger: 0.2,
    });

    gsap.to(imageRightRef.current, {
      opacity: 1,
      ease: "power3.out",
      duration: 1,
      delay: 0.5,
      stagger: 0.2,
    });

  }, { scope: sectionRef });

  // Hover animation handlers
  const handleImageHover = (ref, isEntering) => {
    gsap.to(ref.current, {
      scale: isEntering ? 1.05 : 1,
      y: isEntering ? -10 : 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="debate-activities"
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-black"
    >
      <div className="w-full mx-auto">
        <div
          ref={titleRef}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase leading-none mb-4 sm:mb-0">
            Featured <br /> <span className="ml-0 sm:ml-20">Activities</span>
          </h1>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase self-end leading-none">
            Debate
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            ref={imageLeftRef} 
            className="w-full cursor-pointer"
            onMouseEnter={() => handleImageHover(imageLeftRef, true)}
            onMouseLeave={() => handleImageHover(imageLeftRef, false)}
          >
            <img
              src="/images/debate1.jpg"
              alt="Debate Activity 1"
              className="rounded-lg shadow-xl object-cover w-full aspect-[4/3] max-h-[600px]"
            />
          </div>
          <div 
            ref={imageRightRef} 
            className="w-full cursor-pointer"
            onMouseEnter={() => handleImageHover(imageRightRef, true)}
            onMouseLeave={() => handleImageHover(imageRightRef, false)}
          >
            <img
              src="/images/debate2.jpg"
              alt="Debate Activity 2"
              className="rounded-lg shadow-xl object-cover w-full aspect-[4/3] max-h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Debate;
