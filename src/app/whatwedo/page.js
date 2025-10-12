"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollDemo from "../components/ScrollDemo";
import { useRevealer } from "../components/template/useRevealer";

gsap.registerPlugin(ScrollTrigger);

const ActivityPage = () => {
  useRevealer();
  const mainTextRef = useRef(null);

  useGSAP(() => {
    const mainText = mainTextRef.current;
    const text = mainText.textContent;
    const originalWidth = mainText.offsetWidth;

    mainText.innerHTML = "";
    mainText.style.width = originalWidth + "px";
    mainText.style.wordWrap = "break-word";
    mainText.style.whiteSpace = "pre-wrap";

    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.color = "#1a1a1a";
      span.style.display = "inline";
      span.classList.add(`char-${index}`);
      mainText.appendChild(span);
    });

    const chars = mainText.querySelectorAll("span");
    const subtitle = document.querySelector(".about-subtitle");
    const subtitleText = "DEBATE &nbsp; AND &nbsp; SPEECH";
    const subtitle2 = document.querySelector(".about-subtitle2");
    const subtitleText2 = "SCRABBLE &nbsp; AND &nbsp; MUN";

    // subtitle.innerHTML = `
    //   <div class="subtitle-container relative overflow-hidden h-full">
    //     <div class="subtitle-original">${subtitleText}</div>
    //     <div class="subtitle-duplicate absolute top-0 left-0">${subtitleText}</div>
    //   </div>
    // `;
    // subtitle2.innerHTML = `
    //   <div class="subtitle-container relative overflow-hidden h-full">
    //     <div class="subtitle-original">${subtitleText2}</div>
    //     <div class="subtitle-duplicate absolute top-0 left-0">${subtitleText2}</div>
    //   </div>
    // `;

    let lastScrollY = window.scrollY;
    let scrollDistance = 0;
    const triggerDistance = 100;
    let isAnimating = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      scrollDistance += scrollDelta;

      if (scrollDistance >= triggerDistance && !isAnimating) {
        isAnimating = true;
        scrollDistance = 0;
        const scrollingDown = currentScrollY > lastScrollY;
        const tl = gsap.timeline({ onComplete: () => (isAnimating = false) });

        if (scrollingDown) {
          tl.to(".subtitle-original", { y: "-100%", duration: 0.6, ease: "power3.out" })
            .fromTo(".subtitle-duplicate", { y: "100%" }, { y: "0%", duration: 0.6, ease: "power3.out" }, 0)
            .set(".subtitle-original", { y: "0%" })
            .set(".subtitle-duplicate", { y: "100%" });
        } else {
          tl.to(".subtitle-original", { y: "100%", duration: 0.6, ease: "power3.out" })
            .fromTo(".subtitle-duplicate", { y: "-100%" }, { y: "0%", duration: 0.6, ease: "power3.out" }, 0)
            .set(".subtitle-original", { y: "0%" })
            .set(".subtitle-duplicate", { y: "100%" });
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    gsap.fromTo(
      chars,
      { color: "#ffffff" },
      {
        color: "#1a1a1a",
        duration: 0.1,
        ease: "none",
        stagger: { amount: 2, from: "start" },
        scrollTrigger: {
          trigger: ".about-main",
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1,
        },
      }
    );

    gsap.from(".about-main", {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-main",
        start: "top 75%",
        end: "bottom 25%",
      },
    });

    gsap.from(".about-quote", {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-quote",
        start: "top 95%",
        end: "bottom 5%",
      },
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  });

  return (
    <ReactLenis root>
      <div className="text-black">
        <div className="revealer fixed top-0 left-0 w-screen h-screen origin-top bg-black pointer-events-none z-[100]" />
        <div className="bg-white text-black p-4 sm:p-6">
          <Navbar />
        </div>

        {/* HERO SECTION */}
        <section className="w-full bg-white flex flex-col justify-center items-center overflow-hidden px-4 sm:p-6">
          <h1
            className="text-black font-bold whitespace-nowrap leading-none px-4"
            style={{ fontSize: "37vw", lineHeight: 0.8 }}
          >
            UESC
          </h1>
          <div className="w-full h-screen relative overflow-hidden flex justify-center items-center">
            <img
              src="/images/hero.webp"
              alt="UESC activity background"
              className="absolute inset-0 w-full h-full object-cover object-top md:object-center"
            />
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="relative w-full h-screen bg-white flex flex-col mb-2">
          {/* <div>
            <div className="about-subtitle p-4 sm:p-6" />
            <div className="about-subtitle2 p-4 sm:p-6" />
          </div> */}
          <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
            <p
              ref={mainTextRef}
              className="about-main text-2xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold leading-relaxed max-w-9xl text-indent-8"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;At UESC, we are more than just a club. We are a community that grows together through language. Our activities in Debate, Speech, Scrabble, and Model United Nations help students express ideas with confidence, think critically, and communicate with clarity. We believe that mastering English is not only about speaking fluently but also about connecting meaningfully with others.
            </p>
          </div>
        </section>

        <ScrollDemo />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default ActivityPage;
