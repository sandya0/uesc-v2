"use client";
import React from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRevealer } from '../components/template/useRevealer';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Copy from '../components/template/Copy';

gsap.registerPlugin(ScrollTrigger);

const ActivityPage = () => {
  useRevealer();

  const mainTextRef = useRef(null);

  useGSAP(() => {
    // Split text into individual characters while preserving styling and layout
    const mainText = mainTextRef.current;
    const text = mainText.textContent;
    
    // Store original computed styles
    const computedStyles = window.getComputedStyle(mainText);
    const originalWidth = mainText.offsetWidth;
    
    // Clear the original text and create spans for each character
    mainText.innerHTML = '';
    
    // Ensure container maintains its dimensions
    mainText.style.width = originalWidth + 'px';
    mainText.style.wordWrap = 'break-word';
    mainText.style.whiteSpace = 'pre-wrap';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.color = '#1a1a1a'; // Start with dark color (almost black)
      span.style.display = 'inline';
      span.style.fontFamily = 'inherit';
      span.style.fontSize = 'inherit';
      span.style.fontWeight = 'inherit';
      span.style.lineHeight = 'inherit';
      span.style.letterSpacing = 'inherit';
      span.classList.add(`char-${index}`);
      mainText.appendChild(span);
    });

    // Get all character spans
    const chars = mainText.querySelectorAll('span');

    // Create duplicate subtitle for reveal effect
    const subtitle = document.querySelector(".about-subtitle");
    const subtitleText = "DEBATE  &nbsp; AND   &nbsp; SPEECH";

    // Replace the content with the reveal structure
    subtitle.innerHTML = `
      <div class="subtitle-container relative overflow-hidden h-full">
        <div class="subtitle-original">${subtitleText}</div>
        <div class="subtitle-duplicate absolute top-0 left-0">${subtitleText}</div>
      </div>
    `;

    // Scroll-based subtitle animation with distance trigger
    let lastScrollY = window.scrollY;
    let scrollDistance = 0;
    const triggerDistance = 100; // Trigger animation after scrolling 100px
    let isAnimating = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      scrollDistance += scrollDelta;
      
      // Trigger animation when scroll distance threshold is reached
      if (scrollDistance >= triggerDistance && !isAnimating) {
        isAnimating = true;
        scrollDistance = 0; // Reset distance counter
        
        // Determine scroll direction
        const scrollingDown = currentScrollY > lastScrollY;
        
        // Create timeline for the reveal animation
        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating = false;
          }
        });
        
        if (scrollingDown) {
          // Scrolling down - slide original up and duplicate up from bottom
          tl.to(".subtitle-original", {
            y: "-100%",
            duration: 0.6,
            ease: "power3.out"
          })
          .fromTo(".subtitle-duplicate", 
            { y: "100%" },
            {
              y: "0%",
              duration: 0.6,
              ease: "power3.out"
            }, 0) // Start at the same time as the first animation
          .set(".subtitle-original", { y: "0%" }) // Reset original position
          .set(".subtitle-duplicate", { y: "100%" }); // Reset duplicate position
        } else {
          // Scrolling up - slide original down and duplicate down from top
          tl.to(".subtitle-original", {
            y: "100%",
            duration: 0.6,
            ease: "power3.out"
          })
          .fromTo(".subtitle-duplicate", 
            { y: "-100%" },
            {
              y: "0%",
              duration: 0.6,
              ease: "power3.out"
            }, 0) // Start at the same time as the first animation
          .set(".subtitle-original", { y: "0%" }) // Reset original position
          .set(".subtitle-duplicate", { y: "100%" }); // Reset duplicate position for down scroll
        }
      }
      
      lastScrollY = currentScrollY;
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Character reveal animation
    gsap.fromTo(chars, 
      {
        color: "#1a1a1a", // Start dark
      },
      {
        color: "#ffffff", // End white
        duration: 0.1,
        ease: "none",
        stagger: {
          amount: 2, // Total time for all characters to animate
          from: "start"
        },
        scrollTrigger: {
          trigger: ".about-main",
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1, // Smooth scrubbing tied to scroll position
          toggleActions: "play none none reverse"
        }
      }
    );

    // Main content container animation (opacity and position)
    gsap.from(".about-main", {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-main",
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate quote on scroll
    gsap.from(".about-quote", {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-quote",
        start: "top 95%",
        end: "bottom 5%",
        toggleActions: "play none none none"
      }
    });

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });


  return (
    <ReactLenis root>
      <div className="text-black">
        <div className="revealer fixed top-0 left-0 w-screen h-screen origin-top bg-black pointer-events-none z-100"></div>
        <div className="bg-black text-white p-4 sm:p-6">
          <Navbar />
        </div>

        <section className="w-full h-screen bg-black flex justify-center items-center overflow-hidden">
          <h1 className="text-white font-bold whitespace-nowrap leading-none"
              style={{ fontSize: '40vw', lineHeight: 1 }}>
            UESC
          </h1>
        </section>



    <section className="relative w-full h-screen bg-black text-white flex flex-col">
      {/* Top Left Subtitle */}
      <div className="about-subtitle absolute top-32 left-10 m-2 text-xl md:text-2xl lg:text-3xl 2xl:text-4xl tracking-widest md:tracking-[0.5rem] lg:tracking-[1rem] 2xl:tracking-[1.5rem] font-bold">
   
      </div>

      {/* Main Content (Centered) */}
        <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
          <p 
            ref={mainTextRef}
            className="about-main text-2xl md:text-4xl lg:text-4xl 2xl:text-6xl font-semibold leading-relaxed max-w-9xl text-indent-8"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;At UESC, we are more than just a club we are a community. We are dedicated to fostering English language skills through engaging activities like debate, speech, and scrabble. Our goal is to empower students to communicate with confidence and clarity.
          </p>
        </div>

    </section>
        
      </div>

      <Footer/>
    </ReactLenis>
  );
};

export default ActivityPage;
