"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "./template/Marquee";

gsap.registerPlugin(ScrollTrigger);

const Slogan = () => {
  const item = [
    "UESC 2025",
    "UESC 2025",
    "UESC 2025",
    "UESC 2025",
    "UESC 2025",
    "UESC 2025",
    "UESC 2025",
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = sectionRef.current?.querySelectorAll(".inner-wrapper");
      
      if (!letters) return;

      gsap.to(letters, {
        yPercent: -100,
        duration: 0.3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.05,
          from: "random",
        },
        paused: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "restart none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderSlotWords = (text) => {
    return text.split(" ").map((word, wi) => (
      <span key={wi} className="inline-block mr-[0.25em]">
        {word.split("").map((char, i) => (
          <span
            key={i}
            className="slot-wrapper relative inline-block h-[1.1em] overflow-hidden"
          >
            <span className="inner-wrapper block relative">
              <span className="block">{char}</span>
              <span className="block absolute top-full">{char}</span>
            </span>
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full bg-gray-100 text-black flex flex-col justify-between overflow-hidden"
    >
      {/* Top Marquee
      <div className="">
        <Marquee
          items={item}
          className="bg-black w-full text-white"
        />
      </div> */}

      {/* Slogan Text - Centered */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-wide leading-tight text-center sm:text-left w-full">
          {renderSlotWords("Empowering Voices")}
        </h2>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-wide leading-tight mt-2 sm:mt-4 text-center sm:text-right w-full">
          {renderSlotWords("Building Confidence")}
        </h2>
      </div>

      {/* Bottom Marquee
      <div className="flex-shrink-0">
        <Marquee
          items={item}
          reverse={true}
          className="bg-black text-white"
          iconClassName='stroke-[#cfa355] stroke-2 text-primary'
          icon="material-symbols-light:square"
        />
      </div> */}
    </section>
  );
};

export default Slogan;