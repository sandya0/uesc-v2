'use client';
import React, { useRef, useEffect } from 'react';
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import Link from "./template/Link";
import { gsap } from "gsap";

const Navbar = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const instagramLinkRef = useRef(null);

  useEffect(() => {
    const wrapper = instagramLinkRef.current;
    if (!wrapper) return;

    const innerWrapper = wrapper.querySelector(".inner-wrapper");

    const handleEnter = () => {
      gsap.to(innerWrapper, {
        y: "-100%",
        duration: 0.3,
        ease: "power2.inOut",
      });
    };

    const handleLeave = () => {
      gsap.to(innerWrapper, {
        y: "0%",
        duration: 0.3,
        ease: "power2.inOut",
      });
    };

    wrapper.addEventListener("mouseenter", handleEnter);
    wrapper.addEventListener("mouseleave", handleLeave);

    return () => {
      wrapper.removeEventListener("mouseenter", handleEnter);
      wrapper.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  function triggerPageTransition(path) {
    // Animate the whole <html> element
    const animation = document.documentElement.animate([
      {
      clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)",
    },
     {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
    }],
      {
        duration: 2000,
        easing: "cubic-bezier(0.9, 0, 0.1, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );

    animation.finished.then(() => router.push(path));
  }

  const handdleNavigation = (e, path) => {
    e.preventDefault();
    if (path === pathname) {
      return;
    }

    router.push(path, {
      onTransitionReady: triggerPageTransition,
    });
  };


  return (
    <div
      className="flex justify-between items-center text-4xl sm:text-4xl md:text-5xl xl:text-6xl font-bold uppercase"
    >
        <a
          href="/activity"
          onClick={(e) => handdleNavigation(e, "/")}
        >
          UESC
        </a>
      <div className="hidden md:flex flex-1 text-lg md:text-xl xl:text-2xl justify-center gap-x-8">
        <Link
          href="/whatwedo"
          onClick={(e) => handdleNavigation(e, "/whatwedo")}
        >
          What We Do
        </Link>
        <Link
          href="/"
          onClick={(e) => handdleNavigation(e, "/activity")}
        >
          Activity
        </Link>
        <Link
          href="/"
          onClick={(e) => handdleNavigation(e, "/gallery")}
        >
          Gallery
        </Link>
      </div>
      <div className="flex gap-4 sm:gap-6 text-lg md:text-xl xl:text-2xl">
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
  );
};

export default Navbar;
