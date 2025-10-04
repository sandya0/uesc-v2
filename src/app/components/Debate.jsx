'use client';
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "./template/Copy";

gsap.registerPlugin(ScrollTrigger);

const Debate = () => {
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
      id="debate-activities"
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-black"
    >
      <div className="w-full mx-auto">
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12"
        >
          <Copy>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-black uppercase leading-none mb-4 sm:mb-0">
            Featured <br /> <span className="ml-0 sm:ml-20">Activities</span>
          </h1>
          </Copy>

          <Copy>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-black uppercase self-end leading-none">
            Debate
          </h2>
          </Copy>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            ref={image1Ref}
            className="w-full xl:h-[500px] 2xl:h-[600px] relative cursor-pointer"
          >
            <Image
              src="/images/debate1.webp"
              alt="Debate Activity 1"
              fill
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
          <div 
            ref={image2Ref}
            className="w-full xl:h-[400px] 2xl:h-[500px] relative cursor-pointer"
          >
            <Image
              src="/images/debate2.webp"
              alt="Debate Activity 2"
              fill
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Debate;