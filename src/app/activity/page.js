"use client";
import React, { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRevealer } from "../components/template/useRevealer";
import "./activity.css";
import { gsap } from "gsap";
import { ScrollTrigger, Flip } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Flip);

const ActivityPage = () => {
  useRevealer();
  const flipCtxRef = useRef(null);

  useEffect(() => {
    const createTween = () => {
      const galleryElement = document.querySelector("#gallery-8");
      
      // Safety check - ensure element exists
      if (!galleryElement) return;
      
      const galleryItems = galleryElement.querySelectorAll(".gallery__item");
      
      // Safety check - ensure items exist
      if (galleryItems.length === 0) return;

      // Clean up previous context if it exists
      if (flipCtxRef.current) {
        flipCtxRef.current.revert();
      }
      
      galleryElement.classList.remove("gallery--final");

      flipCtxRef.current = gsap.context(() => {
        // Temporarily add the final class to capture the final state
        galleryElement.classList.add("gallery--final");
        const flipState = Flip.getState(galleryItems);
        galleryElement.classList.remove("gallery--final");

        const flip = Flip.to(flipState, {
          simple: true,
          ease: "expoScale(1, 5)",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryElement,
            start: "center center",
            end: "+=100%",
            scrub: true,
            pin: galleryElement.parentNode,
          },
        });

        tl.add(flip);
      });
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      createTween();
    }, 100);

    const handleResize = () => {
      createTween();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      
      // Revert GSAP context
      if (flipCtxRef.current) {
        flipCtxRef.current.revert();
        flipCtxRef.current = null;
      }
      
      // Kill all ScrollTriggers associated with this component
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && st.trigger.closest("#gallery-8")) {
          st.kill();
        }
      });
      
      // Clear all inline styles from gallery items
      const galleryElement = document.querySelector("#gallery-8");
      if (galleryElement) {
        const galleryItems = galleryElement.querySelectorAll(".gallery__item");
        gsap.set(galleryItems, { clearProps: "all" });
        galleryElement.classList.remove("gallery--final");
      }
    };
  }, []);

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
              Activities
            </h1>
            <div className="flex items-start gap-3">
              <span className="text-6xl sm:text-7xl md:text-9xl xl:text-[200px] font-bold leading-none tracking-tight">
                2025
              </span>
            </div>
          </div>

          {/* About / Description Section */}
          <div className="grid md:grid-cols-2 gap-16 md:gap-32 mb-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Our Events & Programs
              </h2>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed">
                UESC hosts a variety of activities throughout the year to help
                members develop their English skills, teamwork, and confidence.
                From debate competitions to workshops and bonding events, every
                program is designed to engage and empower our members while
                fostering a vibrant community.
              </p>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="w-full h-96 bg-gray-400 rounded-lg mb-20">
            {/* Replace with an actual activity image */}
          </div>

          {/* Activities Section */}
          <div className="py-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-12 text-center">
              Highlighted Activities
            </h2>
            <p className="text-lg md:text-xl text-center mb-16 max-w-3xl mx-auto leading-relaxed">
              Explore some of the events, workshops, and competitions that UESC
              organizes for its members throughout the year. Each activity is
              an opportunity to learn, grow, and have fun!
            </p>
          </div>

          {/* Gallery Section */}
          <div className="gallery-wrap">
            <div id="gallery-8" className="gallery gallery--bento">
              <div className="gallery__item">
                <img
                  src="/images/hero.webp"
                  alt="Activity showcase"
                />
              </div>
              <div className="gallery__item">
                <img
                  src="/images/hero.webp"
                  alt="Activity showcase"
                />
              </div>
              <div className="gallery__item">
                <img
                  src="/images/hero.webp"
                  alt="Activity showcase"
                />
              </div>
              <div className="gallery__item">
                <img
                  src="/images/hero.webp"
                  alt="Activity showcase"
                />
              </div>
              <div className="gallery__item">
                <img
                  src="/images/hero.webp"
                  alt="Activity showcase"
                />
              </div>
              <div className="gallery__item">
                <img
                  src="/images/hero.webp"
                  alt="Activity showcase"
                />
              </div>
              <div className="gallery__item">
                <img
                  src="/images/hero.webp"
                  alt="Activity showcase"
                />
              </div>
              <div className="gallery__item">
                <img
                  src="/images/hero.webp"
                  alt="Activity showcase"
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default ActivityPage;