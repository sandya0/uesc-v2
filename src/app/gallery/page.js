"use client";
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRevealer } from '../components/template/useRevealer';
import gsap from 'gsap';
import { CustomEase } from 'gsap/all';
import SplitType from "split-type";
import items from '../components/template/items';

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Gallery = () => {
  useRevealer();
  
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const projectTitleRef = useRef(null);
  const expandedItemRef = useRef(null);
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Store all the state in refs to avoid re-renders during animation
  const stateRef = useRef({
    itemCount: 20,
    itemGap: 150,
    columns: 4,
    itemWidth: 120,
    itemHeight: 160,
    isDragging: false,
    startX: 0,
    startY: 0,
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    dragVelocityX: 0,
    dragVelocityY: 0,
    lastDragTime: 0,
    mouseHasMoved: false,
    visibleItems: new Set(),
    lastUpdateTime: 0,
    lastX: 0,
    lastY: 0,
    activeItem: null,
    canDrag: true,
    originalPosition: null,
    activeItemId: null,
    titleSplit: null,
    animationFrameId: null
  });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !overlayRef.current || !projectTitleRef.current) {
      return;
    }

    const state = stateRef.current;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    const projectTitleElement = projectTitleRef.current;

    function setAndAnimateTitle(title) {
      if (state.titleSplit) state.titleSplit.revert();
      projectTitleElement.textContent = title;
      state.titleSplit = new SplitType(projectTitleElement, {
        types: "words"
      });
      gsap.set(state.titleSplit.words, {
        y: "100%"
      });
    }

    function animateTitleIn() {
      if (!state.titleSplit) return;
      gsap.to(state.titleSplit.words, {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }

    function animateTitleOut() {
      if (!state.titleSplit) return;
      gsap.to(state.titleSplit.words, {
        y: "-100%",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }

    function updateVisibleItems() {
      const buffer = 2.5;
      const viewWidth = window.innerWidth * (1 + buffer);
      const viewHeight = window.innerHeight * (1 + buffer);
      const movingRight = state.targetX > state.currentX;
      const movingDown = state.targetY > state.currentY;
      const directionBufferX = movingRight ? -300 : 300;
      const directionBufferY = movingDown ? -300 : 300;

      const startCol = Math.floor(
        (-state.currentX - viewWidth / 2 + (movingRight ? directionBufferX : 0)) /
        (state.itemWidth + state.itemGap)
      );
      const endCol = Math.ceil(
        (-state.currentX + viewWidth / 2 + (!movingRight ? directionBufferX : 0)) /
        (state.itemWidth + state.itemGap)
      );
      const startRow = Math.floor(
        (-state.currentY - viewHeight / 2 + (movingDown ? directionBufferY : 0)) /
        (state.itemHeight + state.itemGap)
      );
      const endRow = Math.ceil(
        (-state.currentY + viewHeight / 2 + (!movingDown ? directionBufferY : 0)) /
        (state.itemHeight + state.itemGap)
      );

      const currentItems = new Set();

      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const itemId = `${col},${row}`;
          currentItems.add(itemId);

          if (state.visibleItems.has(itemId)) continue;
          if (state.activeItemId === itemId && isExpanded) continue;

          const item = document.createElement("div");
          item.className = "item";
          item.id = itemId;
          item.style.position = "absolute";
          item.style.width = `${state.itemWidth}px`;
          item.style.height = `${state.itemHeight}px`;
          item.style.left = `${col * (state.itemWidth + state.itemGap)}px`;
          item.style.top = `${row * (state.itemHeight + state.itemGap)}px`;
          item.style.cursor = "pointer";
          item.dataset.col = col;
          item.dataset.row = row;

          const itemNum = (Math.abs(row * state.columns + col) % state.itemCount) + 1;
          const img = document.createElement("img");
          img.src = `/img${itemNum}.jpg`;
          img.alt = `Image ${itemNum}`;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "cover";
          item.appendChild(img);

          item.addEventListener("click", (e) => {
            if (state.mouseHasMoved || state.isDragging) return;
            handleItemClick(item);
          });

          canvas.appendChild(item);
          state.visibleItems.add(itemId);
        }
      }

      state.visibleItems.forEach((itemId) => {
        if (!currentItems.has(itemId) || (state.activeItemId === itemId && isExpanded)) {
          const item = document.getElementById(itemId);
          if (item && canvas.contains(item)) {
            canvas.removeChild(item);
            state.visibleItems.delete(itemId);
          }
        }
      });
    }

    function handleItemClick(item) {
      if (isExpanded) {
        if (expandedItemRef.current) closeExpandedItem();
      } else {
        expandItem(item);
      }
    }

    function expandItem(item) {
      setIsExpanded(true);
      state.activeItem = item;
      state.activeItemId = item.id;
      state.canDrag = false;
      container.style.cursor = "auto";

      const imgSrc = item.querySelector("img").src;
      const imgMatch = imgSrc.match(/\/img(\d+)\.jpg/);
      const imgNum = imgMatch ? parseInt(imgMatch[1]) : 1;
      const titleIndex = (imgNum - 1) % items.length;

      setAndAnimateTitle(items[titleIndex]);
      item.style.visibility = "hidden";

      const rect = item.getBoundingClientRect();
      const targetImg = item.querySelector("img").src;

      state.originalPosition = {
        id: item.id,
        rect: rect,
        imgSrc: targetImg,
      };

      overlay.classList.add("active");

      const expandedItem = document.createElement("div");
      expandedItem.className = "expanded-item";
      expandedItem.style.position = "fixed";
      expandedItem.style.top = "50%";
      expandedItem.style.left = "50%";
      expandedItem.style.transform = "translate(-50%, -50%)";
      expandedItem.style.width = `${state.itemWidth}px`;
      expandedItem.style.height = `${state.itemHeight}px`;
      expandedItem.style.cursor = "pointer";
      expandedItem.style.zIndex = "1000";

      const img = document.createElement("img");
      img.src = targetImg;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      expandedItem.appendChild(img);
      expandedItem.addEventListener("click", closeExpandedItem);
      document.body.appendChild(expandedItem);
      expandedItemRef.current = expandedItem;

      document.querySelectorAll(".item").forEach((el) => {
        if (el !== state.activeItem) {
          gsap.to(el, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      const viewportWidth = window.innerWidth;
      const targetWidth = viewportWidth * 0.4;
      const targetHeight = targetWidth * 1.2;

      gsap.delayedCall(0.5, animateTitleIn);

      gsap.fromTo(
        expandedItem,
        {
          width: state.itemWidth,
          height: state.itemHeight,
          x: rect.left + state.itemWidth / 2 - window.innerWidth / 2,
          y: rect.top + state.itemHeight / 2 - window.innerHeight / 2,
        },
        {
          width: targetWidth,
          height: targetHeight,
          x: 0,
          y: 0,
          duration: 1,
          ease: "expo.out",
        }
      );
    }

    function closeExpandedItem() {
      if (!expandedItemRef.current || !state.originalPosition) return;

      animateTitleOut();
      overlay.classList.remove("active");
      const originalRect = state.originalPosition.rect;

      document.querySelectorAll(".item").forEach((el) => {
        if (el.id !== state.activeItemId) {
          gsap.to(el, {
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
            ease: "power2.out"
          });
        }
      });

      const originalItem = document.getElementById(state.activeItemId);

      gsap.to(expandedItemRef.current, {
        width: state.itemWidth,
        height: state.itemHeight,
        x: originalRect.left + state.itemWidth / 2 - window.innerWidth / 2,
        y: originalRect.top + state.itemHeight / 2 - window.innerHeight / 2,
        duration: 1,
        ease: "expo.out",
        onComplete: () => {
          if (expandedItemRef.current && expandedItemRef.current.parentNode) {
            document.body.removeChild(expandedItemRef.current);
          }

          if (originalItem) {
            originalItem.style.visibility = "visible";
          }

          expandedItemRef.current = null;
          setIsExpanded(false);
          state.activeItem = null;
          state.originalPosition = null;
          state.activeItemId = null;
          state.canDrag = true;
          container.style.cursor = "grab";
          state.dragVelocityX = 0;
          state.dragVelocityY = 0;
        }
      });
    }

    function animate() {
      if (state.canDrag) {
        const ease = 0.075;
        state.currentX += (state.targetX - state.currentX) * ease;
        state.currentY += (state.targetY - state.currentY) * ease;

        canvas.style.transform = `translate(${state.currentX}px, ${state.currentY}px)`;

        const now = Date.now();
        const distMoved = Math.sqrt(
          Math.pow(state.currentX - state.lastX, 2) + Math.pow(state.currentY - state.lastY, 2)
        );

        if (distMoved > 100 || now - state.lastUpdateTime > 120) {
          updateVisibleItems();
          state.lastX = state.currentX;
          state.lastY = state.currentY;
          state.lastUpdateTime = now;
        }
      }

      state.animationFrameId = requestAnimationFrame(animate);
    }

    // Event handlers
    const handleMouseDown = (e) => {
      if (!state.canDrag) return;
      state.isDragging = true;
      state.mouseHasMoved = false;
      state.startX = e.clientX;
      state.startY = e.clientY;
      container.style.cursor = "grabbing";
    };

    const handleMouseMove = (e) => {
      if (!state.isDragging || !state.canDrag) return;

      const dx = e.clientX - state.startX;
      const dy = e.clientY - state.startY;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        state.mouseHasMoved = true;
      }

      const now = Date.now();
      const dt = Math.max(10, now - state.lastDragTime);
      state.lastDragTime = now;

      state.dragVelocityX = dx / dt;
      state.dragVelocityY = dy / dt;

      state.targetX += dx;
      state.targetY += dy;

      state.startX = e.clientX;
      state.startY = e.clientY;
    };

    const handleMouseUp = () => {
      if (!state.isDragging) return;
      state.isDragging = false;

      if (state.canDrag) {
        container.style.cursor = "grab";

        if (Math.abs(state.dragVelocityX) > 0.1 || Math.abs(state.dragVelocityY) > 0.1) {
          const momentumFactor = 200;
          state.targetX += state.dragVelocityX * momentumFactor;
          state.targetY += state.dragVelocityY * momentumFactor;
        }
      }
    };

    const handleOverlayClick = () => {
      if (isExpanded) closeExpandedItem();
    };

    const handleTouchStart = (e) => {
      if (!state.canDrag) return;
      state.isDragging = true;
      state.mouseHasMoved = false;
      state.startX = e.touches[0].clientX;
      state.startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!state.isDragging || !state.canDrag) return;

      const dx = e.touches[0].clientX - state.startX;
      const dy = e.touches[0].clientY - state.startY;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        state.mouseHasMoved = true;
      }

      state.targetX += dx;
      state.targetY += dy;

      state.startX = e.touches[0].clientX;
      state.startY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      state.isDragging = false;
    };

    const handleResize = () => {
      if (isExpanded && expandedItemRef.current) {
        const viewportWidth = window.innerWidth;
        const targetWidth = viewportWidth * 0.4;
        const targetHeight = targetWidth * 1.2;

        gsap.to(expandedItemRef.current, {
          width: targetWidth,
          height: targetHeight,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        updateVisibleItems();
      }
    };

    // Attach event listeners
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    overlay.addEventListener("click", handleOverlayClick);
    container.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);

    // Initialize
    updateVisibleItems();
    animate();

    // Cleanup
    return () => {
      if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId);
      }
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      overlay.removeEventListener("click", handleOverlayClick);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      
      // Clean up any expanded items
      if (expandedItemRef.current && expandedItemRef.current.parentNode) {
        document.body.removeChild(expandedItemRef.current);
      }
    };
  }, [isExpanded]);

  return (
    <ReactLenis root>
      <div className="revealer fixed top-0 left-0 w-screen h-screen origin-top bg-black pointer-events-none z-[100]"></div>
      <div className="bg-white text-black p-4 sm:p-6">
        <Navbar />
      </div>

      <section className="overflow-hidden bg-white text-white">
        <div 
          ref={containerRef}
          className="container relative w-screen h-screen overflow-hidden cursor-grab"
        >
          <div 
            ref={canvasRef}
            className="canvas absolute will-change-transform"
            style={{ willChange: 'transform' }}
          >
          </div>
          <div 
            ref={overlayRef}
            className="overlay fixed top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300 opacity-0 z-[2]"
            style={{
              opacity: isExpanded ? '1' : '0',
              pointerEvents: isExpanded ? 'auto' : 'none'
            }}
          >
          </div>
        </div>

        <div className="projectTitle fixed bottom-10 left-10 text-xl z-10 overflow-hidden">
          <p ref={projectTitleRef}></p>
        </div>
      </section>
    </ReactLenis>
  );
};

export default Gallery;