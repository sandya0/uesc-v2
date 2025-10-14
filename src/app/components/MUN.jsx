'use client';
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "./template/Copy";

gsap.registerPlugin(ScrollTrigger);

const MUN = () => {
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);

  useEffect(() => {
    // Animate first image
    gsap.fromTo(
      image1Ref.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: image1Ref.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate second image with slight delay
    gsap.fromTo(
      image2Ref.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: image2Ref.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section
      id="MUN-activities"
      className="xl:min-h-screen w-full flex flex-col items-center justify-center p-6 text-black"
    >
      <div className="w-full mx-auto">
        {/* Title Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase leading-none mb-4 sm:mb-0">
          </h1>
          <Copy>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-black uppercase self-end leading-none">
            MODEL UNITED NATIONS
          </h2>
          </Copy>
        </div>

        {/* Image Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            ref={image1Ref}
            className="w-full h-[300px] xl:h-[400px] 2xl:h-[500px] relative cursor-pointer"
          >
            <Image
              src="/images/mun1.webp"
              alt="MUN Activity 1"
              fill
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
          <div 
            ref={image2Ref}
            className="w-full h-[300px] xl:h-[500px] 2xl:h-[600px] relative cursor-pointer"
          >
            <Image
              src="/images/mun2.webp"
              alt="MUN Activity 2"
              fill
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUN;
