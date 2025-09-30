"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "./template/Copy";

gsap.registerPlugin(ScrollTrigger);


const JoinUs = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const image = imageRef.current;
    const lines = gsap.utils.toArray(textRef.current.querySelectorAll(".line"));

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(image, { autoAlpha: 0, scale: 0.9, x: -100 });
      gsap.set(lines, { yPercent: 100, autoAlpha: 0 });

      // Timeline for scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.to(image, {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      }).to(
        lines,
        {
          yPercent: 0,
          autoAlpha: 1,
          stagger: 0.3,
          duration: 1,
          ease: "expo.out",
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      id="contact"
      ref={sectionRef}
      className="min-h-screen w-full text-black flex items-center justify-center p-6 overflow-hidden"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">
        {/* Image Content - Now on the left for desktop */}
        <div 
          ref={imageRef} 
          className="w-full flex justify-start items-start cursor-pointer"
          onMouseEnter={() => handleImageHover(imageRef, true)}
          onMouseLeave={() => handleImageHover(imageRef, false)}
        >
          <img
            src="/images/join.jpg"
            alt="UESC Group Photo"
            className="rounded-lg shadow-2xl object-cover w-full max-w-lg h-[300px] md:h-auto md:max-h-[500px]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x400/e2e8f0/a0aec0?text=Image+Not+Found";
            }}
          />
        </div>

        {/* Text Content - Now on the right for desktop */}
        <div
          ref={textRef}
          className="flex flex-col items-start text-left justify-center"
        >
          <Copy delay={0.2}>
          <div className="text-xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            At UESC, you can sharpen your English skills in a supportive environment, gain hands-on experience in public speaking and debating, connect with like-minded peers and mentors, and unlock leadership opportunities for personal growth—all while being part of UMN’s vibrant student community.
          </div>
          </Copy>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
