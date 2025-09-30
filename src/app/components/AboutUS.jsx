"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "./template/Copy";

gsap.registerPlugin(ScrollTrigger);


const AboutUs = () => {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const el = aboutRef.current;
    const title = titleRef.current;
    const image = imageRef.current;
    const link = linkRef.current;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([title, image, link], { autoAlpha: 0 });
      gsap.set(title, { y: 50 });
      gsap.set(image, { scale: 0.95 });
      gsap.set(link, { y: 20 });

      // Timeline for scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(title, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .to(image, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .to(link, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");

      // Slot link hover animation
      const innerWrapper = link.querySelector(".inner-wrapper");
      link.addEventListener("mouseenter", () =>
        gsap.to(innerWrapper, { y: "-100%", duration: 0.3, ease: "power2.inOut" })
      );
      link.addEventListener("mouseleave", () =>
        gsap.to(innerWrapper, { y: "0%", duration: 0.3, ease: "power2.inOut" })
      );

      ScrollTrigger.refresh();
    }, aboutRef);

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
      id="about-us"
      ref={aboutRef}
      className="min-h-screen w-full text-black flex flex-col items-center justify-center p-6"
    >
      <div className="w-full mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase mb-12 sm:mb-16 text-left w-full"
        >
          About Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-center">
          {/* Image */}
          <div 
            ref={imageRef} 
            className="w-full cursor-pointer"
            onMouseEnter={() => handleImageHover(imageRef, true)}
            onMouseLeave={() => handleImageHover(imageRef, false)}
          >
            <img
              src="/images/aboutus.jpg"
              alt="UESC Event"
              className="rounded-lg shadow-2xl object-cover w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/e2e8f0/a0aec0?text=Image+Not+Found";
              }}
            />
          </div>

          {/* Text Content */}
          <div 
            ref={textRef}
            className="flex flex-col items-start text-left space-y-6"
          >
            <Copy delay={0.2}>
            <div className="max-w-full text-xl lg:text-2xl xl:text-4xl leading-relaxed font-bold">
              At UESC, we believe English is more than just a language — it is a tool for expression, collaboration, and global connection. We are a student activity unit at Universitas Multimedia Nusantara (UMN), dedicated to enhancing our members’ English skills while fostering leadership, creativity, and teamwork. With divisions ranging from Debate, Speech, and Scrabble to Model United Nations (MUN), UESC provides a platform for every student to grow, excel, and shine.
            </div>
            </Copy>

            {/* Instagram Link */}
            <a
              ref={linkRef}
              href="https://www.instagram.com/uesc_umn/"
              target="_blank"
              rel="noopener noreferrer"
              className="slot-link relative h-[1.2em] overflow-hidden block cursor-pointer uppercase font-bold text-xl sm:text-2xl"
            >
              <span className="inner-wrapper block relative">
                <span className="inner-text block">Visit Our Instagram</span>
                <span className="inner-text block absolute top-full">Visit Our Instagram</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;