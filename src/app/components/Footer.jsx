'use client';

import React from 'react';
import Link from './template/Link';
import Image from 'next/image';

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Featured", href: "#about-us" },
    { name: "Debate", href: "#debate-activities" },
    { name: "Scrabble", href: "#scrabble-activities" },
    { name: "MUN", href: "#MUN-activities" },
    { name: "Speech", href: "#Speech-activities" },
  ];

  return (
    <footer className="text-black font-sans min-h-screen flex flex-col py-16 px-6 sm:px-8 lg:px-16">
      <div className="w-full flex-grow flex flex-col justify-center">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Section: Image and Logo */}
          <div className="lg:col-span-1">
            <div className="w-full h-[400px] relative mb-8 overflow-hidden rounded-lg">
              <Image 
                src="/images/footer.webp"
                alt="UESC Event" 
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold">UESC</h2>
          </div>

          {/* Middle Section: Links */}
          <div className="lg:col-span-1">
            <ul className="space-y-2 sm:space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section: Contact Info */}
          <div className="lg:col-span-1 text-left text-lg md:text-xl lg:text-2xl xl:text-3xl">
            <div>
              <p className="mb-4">UMN English Student Council (UESC) Empowering Voices, Building Confidence, Creating Community</p>
              <p>
                Universitas Multimedia Nusantara Jl. Boulevard Raya, Gading Serpong, Tangerang, Banten – Indonesia
              </p>
              <div className="mt-6">
                <a href="mailto:uesc@umn.ac.id" className="block hover:underline">uesc@umn.ac.id</a>
                <Link href="https://www.instagram.com/uesc_umn" target="_blank" rel="noopener noreferrer" className="block hover:underline">
                  @uesc_umn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-16">
        {/* Bottom row for copyright and credits */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200 text-base sm:text-lg lg:text-xl font-bold gap-4 sm:gap-0">
          <p className="text-center sm:text-left">
            © 2025 UMN English Student Council. All Rights Reserved.
          </p>
          <Link href="https://www.instagram.com/uesc_umn" target="_blank" rel="noopener noreferrer">
            Instagram
          </Link>
          <p>Made by Sandya</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;