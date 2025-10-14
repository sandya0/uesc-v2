"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import { useRevealer } from '../components/template/useRevealer';
import gsap from 'gsap';
import { CustomEase } from 'gsap/all';
import SplitType from "split-type";
import items from '../components/template/items';
import './gallery.css';

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Item = React.memo(({ id, col, row, state, onClick, isVisible }) => {
    const itemRef = useRef(null);
    const itemNum = (Math.abs(row * state.columns + col) % state.itemCount) + 1;
    const imgSrc = `/img${itemNum}.webp`;

    useEffect(() => {
        if (itemRef.current) {
            gsap.set(itemRef.current, {
                left: `${col * (state.itemWidth + state.itemGap)}px`,
                top: `${row * (state.itemWidth + state.itemGap)}px`,
            });
        }
    }, [col, row, state.itemWidth, state.itemGap]);

    const handleClick = () => {
        onClick(itemRef.current);
    };

    return (
        <div
            ref={itemRef}
            id={id}
            className="item absolute"
            data-col={col}
            data-row={row}
            onClick={handleClick}
            style={{ visibility: isVisible ? 'visible' : 'hidden' }}
        >
            <Image
                src={imgSrc}
                alt={`Image ${itemNum}`}
                width={state.itemWidth}
                height={state.itemHeight}
                quality={80}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                draggable={false}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}
            />
        </div>
    );
});
Item.displayName = 'Item';


const Gallery = () => {
    useRevealer();

    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const overlayRef = useRef(null);
    const projectTitleRef = useRef(null);
    const navbarRef = useRef(null);

    const [visibleItems, setVisibleItems] = useState([]);

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
        lastUpdateTime: 0,
        lastX: 0,
        lastY: 0,
        isExpanded: false,
        activeItem: null,
        canDrag: true,
        originalPosition: null,
        expandedItem: null,
        activeItemId: null,
        titleSplit: null
    });

    const updateVisibleItems = useCallback(() => {
        const state = stateRef.current;
        const buffer = 1.0;
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
            (-state.currentX + viewWidth * 1.5 + (!movingRight ? directionBufferX : 0)) /
            (state.itemWidth + state.itemGap)
        );
        const startRow = Math.floor(
            (-state.currentY - viewHeight / 2 + (movingDown ? directionBufferY : 0)) /
            (state.itemWidth + state.itemGap)
        );
        const endRow = Math.ceil(
            (-state.currentY + viewHeight * 1.5 + (!movingDown ? directionBufferY : 0)) /
            (state.itemWidth + state.itemGap)
        );

        const newVisibleItems = [];
        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                const itemId = `${col},${row}`;
                newVisibleItems.push({ id: itemId, col, row });
            }
        }
        setVisibleItems(newVisibleItems);
    }, []);

    const closeExpandedItem = useCallback(() => {
        const state = stateRef.current;
        if (!state.expandedItem || !state.originalPosition) return;

        if (state.titleSplit) {
            gsap.to(state.titleSplit.words, {
                y: "-100%",
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });
        }

        overlayRef.current.classList.remove("active");
        if (navbarRef.current) {
            navbarRef.current.classList.remove("bg-black");
            navbarRef.current.classList.add("bg-white");
        }
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

        gsap.to(state.expandedItem, {
            width: state.itemWidth,
            height: state.itemHeight,
            x: originalRect.left + state.itemWidth / 2 - window.innerWidth / 2,
            y: originalRect.top + state.itemHeight / 2 - window.innerHeight / 2,
            duration: 1,
            ease: "hop",
            onComplete: () => {
                if (state.expandedItem && state.expandedItem.parentNode) {
                    document.body.removeChild(state.expandedItem);
                }

                setVisibleItems(prev => {
                    const newItems = [...prev];
                    const item = newItems.find(i => i.id === state.activeItemId);
                    return newItems;
                });

                if (originalItem) {
                    originalItem.style.visibility = "visible";
                }

                state.expandedItem = null;
                state.isExpanded = false;
                state.activeItem = null;
                state.originalPosition = null;
                state.activeItemId = null;
                state.canDrag = true;
                if (containerRef.current) {
                    containerRef.current.style.cursor = "grab";
                }
                state.dragVelocityX = 0;
                state.dragVelocityY = 0;
            }
        });
    }, []);

        const expandItem = useCallback((item) => {
            const state = stateRef.current;
            state.isExpanded = true;
            state.activeItem = item;
            state.activeItemId = item.id;
            state.canDrag = false;
            if (containerRef.current) {
                containerRef.current.style.cursor = "auto";
            }

            const imgSrc = item.querySelector("img").src;
            const imgMatch = imgSrc.match(/(?:\/|^)images\/img(\d+)\.webp$/);
            const imgNum = imgMatch ? parseInt(imgMatch[1]) : 1;
            const titleIndex = (imgNum - 1) % items.length;

            if (state.titleSplit) state.titleSplit.revert();
            projectTitleRef.current.textContent = items[titleIndex];
            state.titleSplit = new SplitType(projectTitleRef.current, { types: "words" });
            gsap.set(state.titleSplit.words, { y: "100%" });
            gsap.to(state.titleSplit.words, {
                y: "0%",
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });

            const rect = item.getBoundingClientRect();
            const targetImg = item.querySelector("img").src;

            state.originalPosition = {
                id: item.id,
                rect: rect,
                imgSrc: targetImg,
            };

            overlayRef.current.classList.add("active");
            if (navbarRef.current) {
                navbarRef.current.classList.remove("bg-white");
                navbarRef.current.classList.add("bg-black");
            }

            document.querySelectorAll(".item").forEach((el) => {
                if (el.id !== state.activeItemId) {
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

            // --- REFACTORED LOGIC STARTS HERE ---

            state.expandedItem = document.createElement("div");
            state.expandedItem.className = "expanded-item";
            state.expandedItem.style.width = `${state.itemWidth}px`;
            state.expandedItem.style.height = `${state.itemHeight}px`;

            const img = document.createElement("img");
            img.loading = "eager";
            img.decoding = "async";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            state.expandedItem.appendChild(img);
            state.expandedItem.addEventListener("click", closeExpandedItem);

            // This function contains the logic that should only run AFTER the image loads
            const onImageLoad = () => {
                // 1. Now that the new image is ready, hide the original grid item.
                item.style.visibility = "hidden";
                
                // 2. Add the fully-prepared expanded item to the DOM.
                document.body.appendChild(state.expandedItem);

                // 3. Start the animation.
                gsap.fromTo(
                    state.expandedItem,
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
            };

            // Assign the onload handler and then set the src to trigger the load.
            img.onload = onImageLoad;
            img.src = targetImg;

            // Add a safeguard for cached images which might not fire 'onload'.
            if (img.complete) {
            onImageLoad();
            }

            // --- REFACTORED LOGIC ENDS HERE ---

        }, [closeExpandedItem]);

    const handleItemClick = useCallback((item) => {
        const state = stateRef.current;
        if (state.mouseHasMoved || state.isDragging) return;
        if (state.isExpanded) {
            if (state.expandedItem) closeExpandedItem();
        } else {
            expandItem(item);
        }
    }, [closeExpandedItem, expandItem]);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const overlay = overlayRef.current;
        const state = stateRef.current;

        let animationFrameId;

        function animate() {
            if (state.canDrag) {
                const ease = 0.075;
                state.currentX += (state.targetX - state.currentX) * ease;
                state.currentY += (state.targetY - state.currentY) * ease;

                if (canvas) {
                    canvas.style.transform = `translate(${state.currentX}px, ${state.currentY}px)`;
                }

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

            animationFrameId = requestAnimationFrame(animate);
        }

        const handleMouseDown = (e) => {
            if (!state.canDrag) return;
            state.isDragging = true;
            state.mouseHasMoved = false;
            state.startX = e.clientX;
            state.startY = e.clientY;
            if (container) {
                container.style.cursor = "grabbing";
            }
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

        const handleMouseUp = (e) => {
            if (!state.isDragging) return;
            state.isDragging = false;

            if (state.canDrag) {
                if(container){
                    container.style.cursor = "grab";
                }

                if (Math.abs(state.dragVelocityX) > 0.1 || Math.abs(state.dragVelocityY) > 0.1) {
                    const momentumFactor = 200;
                    state.targetX += state.dragVelocityX * momentumFactor;
                    state.targetY += state.dragVelocityY * momentumFactor;
                }
            }
        };

        const handleOverlayClick = () => {
            if (state.isExpanded) closeExpandedItem();
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
            if (state.isExpanded && state.expandedItem) {
                const viewportWidth = window.innerWidth;
                const targetWidth = viewportWidth * 0.4;
                const targetHeight = targetWidth * 1.2;

                gsap.to(state.expandedItem, {
                    width: targetWidth,
                    height: targetHeight,
                    duration: 0.3,
                    ease: "power2.out",
                });
            } else {
                updateVisibleItems();
            }
        };

        if (container) {
            container.addEventListener("mousedown", handleMouseDown);
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            container.addEventListener("touchstart", handleTouchStart);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("touchend", handleTouchEnd);
        }
        if(overlay) {
            overlay.addEventListener("click", handleOverlayClick);
        }
        window.addEventListener("resize", handleResize);

        updateVisibleItems();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (container) {
                container.removeEventListener("mousedown", handleMouseDown);
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
                container.removeEventListener("touchstart", handleTouchStart);
                window.removeEventListener("touchmove", handleTouchMove);
                window.removeEventListener("touchend", handleTouchEnd);
            }
            if(overlay) {
                overlay.removeEventListener("click", handleOverlayClick);
            }
            window.removeEventListener("resize", handleResize);

            if (state.titleSplit) state.titleSplit.revert();
        };
    }, [updateVisibleItems, closeExpandedItem]);

    const preloadImages = () => {
        const images = [];
        for (let i = 1; i <= 20; i++) {
            images.push(
                <div key={i} className="hidden">
                    <Image
                        src={`/img${i}.webp`}
                        alt={`Preload Image ${i}`}
                        width={120}
                        height={160}
                        priority={i <= 5}
                        quality={80}
                    />
                </div>
            );
        }
        return images;
    };

    return (
        <div className="w-screen h-screen overflow-hidden">
            <div className="revealer fixed top-0 left-0 w-screen h-screen origin-top bg-black pointer-events-none z-100"></div>
            <div ref={navbarRef} className="bg-white text-black p-4 sm:p-6 absolute top-0 left-0 w-full z-10">
                <Navbar />
            </div>

            <section className="w-full h-full">
                <div ref={containerRef} className="gallery-container relative w-full h-full overflow-hidden cursor-grab">
                    <div ref={canvasRef} className="canvas absolute will-change-transform">
                        {visibleItems.map(item => (
                            <Item
                                key={item.id}
                                {...item}
                                state={stateRef.current}
                                onClick={handleItemClick}
                                isVisible={!stateRef.current.isExpanded || stateRef.current.activeItemId !== item.id}
                            />
                        ))}
                    </div>
                    <div ref={overlayRef} className="overlay fixed top-0 left-0 w-full h-full bg-white pointer-events-none transition-opacity duration-300 ease-in-out opacity-0 z-[2]">
                    </div>
                </div>

                <div className="projectTitle absolute text-xl">
                    <p ref={projectTitleRef}></p>
                </div>
            </section>

            {preloadImages()}
        </div>
    );
};

export default Gallery;