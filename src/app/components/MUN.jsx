"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MUN = () => {
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
      id="MUN-activities"
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-black"
    >
      <div className="w-full mx-auto">
        {/* Title Section */}
        <div ref={titleRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase leading-none mb-4 sm:mb-0">
          </h1>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase self-end leading-none">
            MODEL UNITED NATIONS
          </h2>
        </div>

        {/* Image Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            ref={imageLeftRef} 
            className="w-full cursor-pointer"
            onMouseEnter={() => handleImageHover(imageLeftRef, true)}
            onMouseLeave={() => handleImageHover(imageLeftRef, false)}
          >
            <img
              src="/images/mun1.jpg"
              alt="MUN Activity 1"
              className="rounded-lg shadow-xl object-cover w-full h-[300px] md:h-auto md:max-h-[500px]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/e2e8f0/a0aec0?text=Image+Not+Found";
              }}
            />
          </div>
          <div 
            ref={imageRightRef} 
            className="w-full cursor-pointer"
            onMouseEnter={() => handleImageHover(imageRightRef, true)}
            onMouseLeave={() => handleImageHover(imageRightRef, false)}
          >
            <img
              src="/images/mun2.jpg"
              alt="MUN Activity 2"
              className="rounded-lg shadow-xl object-cover w-full h-[300px] md:h-auto md:max-h-[600px]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/e2e8f0/a0aec0?text=Image+Not+Found";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUN;
