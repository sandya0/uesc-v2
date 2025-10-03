'use client';

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Link = ({ href, children, className = "", onClick, target, rel }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
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

  return (
    <a href={href} className={className} onClick={onClick} target={target} rel={rel}>
      <span
        ref={wrapperRef}
        className="slot-link relative overflow-hidden block cursor-pointer"
      >
        <span className="inner-wrapper block relative">
          <span className="inner-text block">{children}</span>
          <span className="inner-text block absolute top-full">{children}</span>
        </span>
      </span>
    </a>
  );
};

export default Link;
