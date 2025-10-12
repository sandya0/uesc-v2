'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import Link from "./template/Link";
import { gsap } from "gsap";

const Navbar = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const instagramLinkRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  // Instagram hover animation
  useEffect(() => {
    const wrapper = instagramLinkRef.current;
    if (!wrapper) return;
    const innerWrapper = wrapper.querySelector(".inner-wrapper");

    const handleEnter = () => gsap.to(innerWrapper, { y: "-100%", duration: 0.3, ease: "power2.inOut" });
    const handleLeave = () => gsap.to(innerWrapper, { y: "0%", duration: 0.3, ease: "power2.inOut" });

    wrapper.addEventListener("mouseenter", handleEnter);
    wrapper.addEventListener("mouseleave", handleLeave);

    return () => {
      wrapper.removeEventListener("mouseenter", handleEnter);
      wrapper.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Toggle burger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);

    gsap.to(menuRef.current, {
      x: isOpen ? "100%" : "0%",
      duration: 0.5,
      ease: "power3.out"
    });

    gsap.to(topLineRef.current, {
      rotate: isOpen ? 0 : 45,
      y: isOpen ? 0 : 5,
      duration: 0.3,
      ease: "power2.inOut"
    });

    gsap.to(bottomLineRef.current, {
      rotate: isOpen ? 0 : -45,
      y: isOpen ? 0 : -5,
      duration: 0.3,
      ease: "power2.inOut"
    });
  };

  function triggerPageTransition(path) {
    const animation = document.documentElement.animate([
      { clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)" },
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" }
    ], {
      duration: 2000,
      easing: "cubic-bezier(0.9, 0, 0.1, 1)",
      pseudoElement: "::view-transition-new(root)",
    });

    animation.finished.then(() => router.push(path));
  }

  const handdleNavigation = (e, path) => {
    e.preventDefault();
    if (path === pathname) return;
    router.push(path, { onTransitionReady: triggerPageTransition });
    if (isOpen) toggleMenu();
  };

  // All burger menu items, including Home and Instagram
  const burgerLinks = [
    { name: "Home", path: "/" },
    { name: "What We Do", path: "/whatwedo" },
    { name: "Activity", path: "/activity" },
    { name: "Gallery", path: "/gallery" },
    { name: "Instagram", path: "https://www.instagram.com/uesc_umn/", external: true },
  ];

  return (
    <>
      {/* Burger Icon */}
      <div
        className="fixed top-4 right-4 z-50 md:hidden w-14 h-14 flex flex-col items-center justify-center gap-1 bg-black rounded-full cursor-pointer"
        onClick={toggleMenu}
      >
        <span ref={topLineRef} className="block w-8 h-0.5 bg-white rounded-full origin-center"></span>
        <span ref={bottomLineRef} className="block w-8 h-0.5 bg-white rounded-full origin-center"></span>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-full h-full bg-black z-40 flex flex-col justify-center items-center gap-8 transform translate-x-full md:hidden"
      >
        {burgerLinks.map((link, index) => (
          link.external ? (
            <a
              key={index}
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold uppercase text-white hover:text-gray-300 transition-colors"
            >
              {link.name}
            </a>
          ) : (
            <Link
              key={index}
              href={link.path}
              onClick={(e) => handdleNavigation(e, link.path)}
              ref={(el) => (linksRef.current[index] = el)}
              className="text-2xl font-bold uppercase text-white hover:text-gray-300 transition-colors"
            >
              {link.name}
            </Link>
          )
        ))}
      </div>

      {/* Desktop Navbar */}
      <div className="flex justify-between items-center text-4xl sm:text-4xl md:text-5xl xl:text-6xl font-bold uppercase">
        <a href="/" onClick={(e) => handdleNavigation(e, "/")}>
          UESC
        </a>
        <div className="hidden md:flex  flex-1 justify-center gap-x-8 text-lg md:text-xl xl:text-2xl">
          {[
            { name: "What We Do", path: "/whatwedo" },
            { name: "Activity", path: "/activity" },
            { name: "Gallery", path: "/gallery" },
          ].map((link, index) => (
            <Link
              key={index}
              href={link.path}
              onClick={(e) => handdleNavigation(e, link.path)}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex  gap-4 sm:gap-6 text-lg md:text-xl xl:text-2xl">
          <a
            href="https://www.instagram.com/uesc_umn/"
            target="_blank"
            rel="noopener noreferrer"
            className="slot-link relative overflow-hidden block cursor-pointer"
            ref={instagramLinkRef}
          >
            <span className="inner-wrapper block relative">
              <span className="inner-text block">Visit Our Instagram</span>
              <span className="inner-text block absolute top-full">Visit Our Instagram</span>
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
