'use client';

import React from "react";
import Image from "next/image";
import Copy from "./template/Copy";
import Link from "./template/Link";

const AboutUs = () => {
  return (
    <section
      id="about-us"
      className="min-h-screen w-full text-black flex flex-col items-center justify-center p-6"
    >
      <div className="w-full mx-auto">
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase mb-12 sm:mb-16 text-left w-full"
        >
          About Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-center">
          {/* Image */}
          <div 
            className="w-full h-[400px] relative cursor-pointer"
          >
            <Image
              src="/images/aboutus.webp"
              alt="UESC Event"
              fill
              className="rounded-lg shadow-2xl object-cover"
            />
          </div>

          {/* Text Content */}
          <div 
            className="flex flex-col items-start text-left space-y-6"
          >
            <Copy>
            <div className="min-w-full text-xl lg:text-2xl xl:text-2xl 2xl:text-4xl leading-relaxed font-bold">
              At UESC, we believe English is more than just a language — it is a tool for expression, collaboration, and global connection. We are a student activity unit at Universitas Multimedia Nusantara (UMN), dedicated to enhancing our members’ English skills while fostering leadership, creativity, and teamwork. With divisions ranging from Debate, Speech, and Scrabble to Model United Nations (MUN), UESC provides a platform for every student to grow, excel, and shine.
            </div>
            </Copy>

            {/* Instagram Link */}
            <Link
              href="https://www.instagram.com/uesc_umn/"
              target="_blank"
              rel="noopener noreferrer"
              className="slot-link relative h-[1.2em] overflow-hidden block cursor-pointer uppercase font-bold text-xl sm:text-2xl"
            >
              <span className="inner-wrapper block relative">
                <span className="inner-text block">Visit Our Instagram</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
