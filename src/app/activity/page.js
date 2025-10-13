"use client";
import React, { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRevealer } from "../components/template/useRevealer";
import "./activity.css";
import { gsap } from "gsap";
import { ScrollTrigger, Flip } from "gsap/all";
import Copy from "../components/template/Copy";

gsap.registerPlugin(ScrollTrigger, Flip);

const ActivityPage = () => {
  useRevealer();
  const flipCtxRef = useRef([]);

  const createTween = (galleryId) => {
    const galleryElement = document.querySelector(`#${galleryId}`);
    if (!galleryElement) return;
    const galleryItems = galleryElement.querySelectorAll(".gallery__item");
    if (galleryItems.length === 0) return;

    // Revert previous context if exists
    const ctxIndex = flipCtxRef.current.findIndex((ctx) => ctx?.galleryId === galleryId);
    if (ctxIndex >= 0) {
      flipCtxRef.current[ctxIndex].ctx.revert();
    }

    galleryElement.classList.remove("gallery--final");

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
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

      // Save context reference
      if (ctxIndex >= 0) {
        flipCtxRef.current[ctxIndex] = { galleryId, ctx };
      } else {
        flipCtxRef.current.push({ galleryId, ctx });
      }
    });
  };

  useEffect(() => {
    const galleryIds = ["gallery-prelude", "gallery-joint", "gallery-unity"];
    galleryIds.forEach((id) => createTween(id));

    const handleResize = () => galleryIds.forEach((id) => createTween(id));
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      flipCtxRef.current.forEach((ctxObj) => ctxObj.ctx.revert());
      flipCtxRef.current = [];

      ScrollTrigger.getAll().forEach((st) => st.kill());

      galleryIds.forEach((id) => {
        const galleryElement = document.querySelector(`#${id}`);
        if (galleryElement) {
          const items = galleryElement.querySelectorAll(".gallery__item");
          gsap.set(items, { clearProps: "all" });
          galleryElement.classList.remove("gallery--final");
        }
      });
    };
  }, []);

  const galleries = [
    {
      id: "gallery-prelude",
      title: "Prelude",
      description:
        "Prelude UESC is an annual event by the UMN English Student Council that welcomes new members, introduces them to the organization, and fosters teamwork and an English-speaking culture on campus through bonding activities, workshops, and fun challenges.",
      images: ["/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp"],
    },
    {
      id: "gallery-joint",
      title: "Joint Meeting",
      description:
        "The UESC Joint Meeting is a gathering of all four UESC divisions, which are Scrabble, Speech, Debate, and MUN. The purpose of the meeting is to provide an opportunity for members from different divisions to come together, strengthen their relationships, and engage in enjoyable activities. It is designed to promote teamwork, communication, and a sense of community within UESC while allowing members to have fun and connect outside of their regular division activities.",
      images: ["/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp"],
    },
    {
      id: "gallery-unity",
      title: "Unity",
      description:
        "UNITY 2025 is an English language competition organized by the UMN English Student Council (UESC) at Universitas Multimedia Nusantara. The event features three main contests: Debate, Speech, and Scrabble. The Debate competition develops critical thinking, logical argumentation, and confidence in presenting ideas. The Speech competition sharpens public speaking skills, focusing on clarity, structure, and effective communication. Scrabble challenges participants to expand their vocabulary while enhancing strategic thinking. UNITY 2025 provides a platform for students to compete, collaborate, and showcase their English proficiency in a fun and educational environment.",
      images: ["/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp", "/images/hero.webp"],
    },
  ];

  return (
    <ReactLenis root>
      <div className="text-black">
        <div className="revealer fixed top-0 left-0 w-screen h-screen origin-top bg-black pointer-events-none z-100"></div>
        <div className="p-4 sm:p-6">
          <Navbar />
        </div>

        <div className="px-6 md:px-8 mt-20 md:mt-32">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-24 md:mb-32 gap-6 sm:gap-0">
            <h1 className="text-6xl sm:text-7xl md:text-9xl xl:text-[150px] 2xl:text-[200px] font-bold leading-none tracking-tight">
              Activities
            </h1>
            <div className="flex items-start gap-3">
              <span className="text-6xl sm:text-7xl md:text-9xl xl:text-[150px] 2xl:text-[200px] font-bold leading-none tracking-tight">
                2025
              </span>
            </div>
          </div>

          {/* About Section */}
          <div className="grid md:grid-cols-2 gap-16 md:gap-32 mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold">Our Events & Programs</h2>
            </div>
            <div>
              <Copy delay={0.5}>
              <p className="text-xl lg:text-2xl 2xl:text-3xl leading-relaxed font-bold">
                UESC hosts a variety of activities throughout the year to help
                members develop their English skills, teamwork, and confidence.
                From debate competitions to workshops and bonding events, every
                program is designed to engage and empower our members while
                fostering a vibrant community.
              </p>
              </Copy>
            </div>
          </div>

          {/* Loop through galleries */}
{galleries.map((gallery) => (
  <div key={gallery.id} className="mb-32">
    {/* Gallery Images */}
    <div className="gallery-wrap mb-12">
      <div id={gallery.id} className="gallery gallery--bento">
        {gallery.images.map((img, idx) => (
          <div className="gallery__item" key={idx}>
            <img src={img} alt={`${gallery.title} showcase`} />
          </div>
        ))}
      </div>
    </div>

    {/* Explanation Section */}
    <div className="px-6 md:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        {/* Left: Heading */}
        <div className="md:w-1/2 flex justify-start">
          <h2 className="text-6xl md:text-7xl font-bold">{gallery.title}</h2>
        </div>

        {/* Right: Paragraph */}
        <div className="md:w-1/2 flex justify-center">
          <Copy delay={0.3}>
            <p className="text-xl xl:text-2xl 2xl:text-3xl leading-relaxed font-bold">
              {gallery.description}
            </p>
          </Copy>
        </div>
      </div>
    </div>
  </div>
))}

        </div>

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default ActivityPage;
