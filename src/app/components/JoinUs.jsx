'use client';
import React from "react";
import Image from "next/image";
import Copy from "./template/Copy";

const JoinUs = () => {
  return (
    <section
      id="contact"
      className="min-h-screen w-full text-black flex items-center justify-center p-6 overflow-hidden"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
        {/* Image Content - Now on the left for desktop */}
        <div 
          className="w-full h-[500px] relative cursor-pointer"
        >
          <Image
            src="/images/join.webp"
            alt="UESC Group Photo"
            fill
            className="rounded-lg shadow-2xl object-cover"
          />
        </div>
        {/* Text Content - Now on the right for desktop */}
        <div
          className="flex flex-col items-start text-left justify-center"
        >
          <Copy>
          <div className="text-xl lg:text-2xl xl:text-4xl max-w-full font-bold leading-tight">
            At UESC, you can sharpen your English skills in a supportive environment, gain hands-on experience in public speaking and debating, connect with like-minded peers and mentors, and unlock leadership opportunities for personal growth—all while being part of UMN's vibrant student community.
          </div>
          </Copy>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;