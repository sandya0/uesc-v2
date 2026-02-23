"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import { useRevealer } from '../components/template/useRevealer';
import gsap from 'gsap';
import { CustomEase } from 'gsap/all';
import './gallery.css';

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Item = React.memo(({ id, col, row, itemWidth, itemHeight, itemGap, itemCount, onClick, isVisible }) => {
    const itemRef = useRef(null);
    const itemNum = (Math.abs(row * 4 + col) % itemCount) + 1;
    const imgSrc = `/img${itemNum}.webp`;

    // 🚀 FIX: yPos now correctly uses itemHeight instead of itemWidth!
    const xPos = col * (itemWidth + itemGap);
    const yPos = row * (itemHeight + itemGap);

    return (
        <div
            ref={itemRef}
            id={id}
            className="item absolute"
            data-col={col}
            data-row={row}
            onClick={() => onClick(itemRef.current)}
            style={{ 
                top: 0, 
                left: 0, 
                visibility: isVisible ? 'visible' : 'hidden',
                transform: `translate3d(${xPos}px, ${yPos}px, 0)`,
                width: `${itemWidth}px`,
                height: `${itemHeight}px`
            }}
        >
            <img
                src={imgSrc}
                alt={`Image ${itemNum}`}
                draggable={false}
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
            />
        </div>
    );
}, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.isVisible === next.isVisible &&
        prev.itemWidth === next.itemWidth &&
        prev.itemHeight === next.itemHeight &&
        prev.itemGap === next.itemGap
    );
});
Item.displayName = 'Item';

const PreloadImages = React.memo(() => (
    <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
        {Array.from({ length: 20 }, (_, i) => (
            <img key={i + 1} src={`/img${i + 1}.webp`} alt="" />
        ))}
    </div>
));
PreloadImages.displayName = 'PreloadImages';

const Gallery = () => {
    useRevealer();

    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const overlayRef = useRef(null);
    const navbarRef = useRef(null);

    const [visibleItems, setVisibleItems] = useState([]);
    const [expandedItemId, setExpandedItemId] = useState(null);
    
    // Increased default gap sizes
    const [gridConfig, setGridConfig] = useState({ itemWidth: 120, itemHeight: 160, itemGap: 150 });

    const stateRef = useRef({
        itemCount: 20,
        itemWidth: 120,
        itemHeight: 160,
        itemGap: 150,
        columns: 4,
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
        lastX: 0,
        lastY: 0,
        isExpanded: false,
        activeItem: null,
        canDrag: true,
        originalPosition: null,
        expandedItem: null,
        activeItemId: null,
        lastStartCol: null,
        lastEndCol: null,
        lastStartRow: null,
        lastEndRow: null,
    });

    const updateVisibleItems = useCallback(() => {
        const state = stateRef.current;
        const buffer = 0.4;
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
        // 🚀 FIX: Used state.itemHeight here instead of state.itemWidth for correct vertical chunking
        const startRow = Math.floor(
            (-state.currentY - viewHeight / 2 + (movingDown ? directionBufferY : 0)) /
            (state.itemHeight + state.itemGap)
        );
        const endRow = Math.ceil(
            (-state.currentY + viewHeight * 1.5 + (!movingDown ? directionBufferY : 0)) /
            (state.itemHeight + state.itemGap)
        );

        if (
            startCol === state.lastStartCol &&
            endCol === state.lastEndCol &&
            startRow === state.lastStartRow &&
            endRow === state.lastEndRow
        ) return;

        state.lastStartCol = startCol;
        state.lastEndCol = endCol;
        state.lastStartRow = startRow;
        state.lastEndRow = endRow;

        const newVisibleItems = [];
        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                newVisibleItems.push({ id: `${col},${row}`, col, row });
            }
        }
        setVisibleItems(newVisibleItems);
    }, []);

    const closeExpandedItem = useCallback(() => {
        const state = stateRef.current;
        if (!state.expandedItem || !state.originalPosition) return;

        overlayRef.current.classList.remove("active");
        if (navbarRef.current) {
            navbarRef.current.classList.remove("bg-black");
            navbarRef.current.classList.add("bg-white");
        }

        const originalRect = state.originalPosition.rect;
        const closingItemId = state.activeItemId;

        document.querySelectorAll(".item").forEach((el) => {
            if (el.id !== closingItemId) {
                gsap.to(el, { opacity: 1, duration: 0.5, delay: 0.5, ease: "power2.out" });
            }
        });

        gsap.to(state.expandedItem, {
            width: state.itemWidth,
            height: state.itemHeight,
            xPercent: -50,
            yPercent: -50,
            x: originalRect.left + state.itemWidth / 2 - window.innerWidth / 2,
            y: originalRect.top + state.itemHeight / 2 - window.innerHeight / 2,
            duration: 1,
            ease: "hop",
            onComplete: () => {
                if (state.expandedItem?.parentNode) {
                    document.body.removeChild(state.expandedItem);
                }
                const originalItem = document.getElementById(closingItemId);
                if (originalItem) originalItem.style.visibility = "visible";

                state.expandedItem = null;
                state.isExpanded = false;
                state.activeItem = null;
                state.originalPosition = null;
                state.activeItemId = null;
                state.canDrag = true;
                state.dragVelocityX = 0;
                state.dragVelocityY = 0;

                setExpandedItemId(null);
                if (containerRef.current) containerRef.current.style.cursor = "grab";
            }
        });
    }, []);

    const expandItem = useCallback((item) => {
        const state = stateRef.current;
        state.isExpanded = true;
        state.activeItem = item;
        state.activeItemId = item.id;
        state.canDrag = false;
        if (containerRef.current) containerRef.current.style.cursor = "auto";

        const rect = item.getBoundingClientRect();
        const targetImg = item.querySelector("img").src;

        state.originalPosition = { id: item.id, rect, imgSrc: targetImg };

        overlayRef.current.classList.add("active");
        if (navbarRef.current) {
            navbarRef.current.classList.remove("bg-white");
            navbarRef.current.classList.add("bg-black");
        }

        document.querySelectorAll(".item").forEach((el) => {
            if (el.id !== state.activeItemId) {
                gsap.to(el, { opacity: 0, duration: 0.3, ease: "power2.out" });
            }
        });

        const viewportWidth = window.innerWidth;
        const targetWidth = viewportWidth > 768 ? viewportWidth * 0.35 : viewportWidth * 0.7;
        const targetHeight = targetWidth * (state.itemHeight / state.itemWidth);

        state.expandedItem = document.createElement("div");
        state.expandedItem.className = "expanded-item";
        state.expandedItem.style.width = `${state.itemWidth}px`;
        state.expandedItem.style.height = `${state.itemHeight}px`;

        const img = document.createElement("img");
        img.decoding = "async";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        state.expandedItem.appendChild(img);
        state.expandedItem.addEventListener("click", closeExpandedItem);

        const onImageLoad = () => {
            item.style.visibility = "hidden";
            setExpandedItemId(item.id);

            document.body.appendChild(state.expandedItem);

            gsap.fromTo(
                state.expandedItem,
                {
                    width: state.itemWidth,
                    height: state.itemHeight,
                    xPercent: -50,
                    yPercent: -50,
                    x: rect.left + state.itemWidth / 2 - window.innerWidth / 2,
                    y: rect.top + state.itemHeight / 2 - window.innerHeight / 2,
                },
                {
                    width: targetWidth,
                    height: targetHeight,
                    xPercent: -50,
                    yPercent: -50,
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "expo.out",
                }
            );
        };

        img.onload = onImageLoad;
        img.src = targetImg;
        if (img.complete) onImageLoad();

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
        let visibilityThrottle = null;

        const scheduleVisibilityUpdate = () => {
            if (visibilityThrottle) return;
            visibilityThrottle = setTimeout(() => {
                updateVisibleItems();
                visibilityThrottle = null;
            }, 100);
        };

        function animate() {
            if (state.canDrag) {
                const ease = 0.075;
                state.currentX += (state.targetX - state.currentX) * ease;
                state.currentY += (state.targetY - state.currentY) * ease;

                if (canvas) {
                    canvas.style.transform = `translate3d(${state.currentX}px, ${state.currentY}px, 0)`;
                }

                const distMoved = Math.sqrt(
                    Math.pow(state.currentX - state.lastX, 2) +
                    Math.pow(state.currentY - state.lastY, 2)
                );

                if (distMoved > 100) {
                    scheduleVisibilityUpdate();
                    state.lastX = state.currentX;
                    state.lastY = state.currentY;
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
            state.dragVelocityX = 0;
            state.dragVelocityY = 0;
            if (container) container.style.cursor = "grabbing";
        };

        const handleMouseMove = (e) => {
            if (!state.isDragging || !state.canDrag) return;
            const dx = e.clientX - state.startX;
            const dy = e.clientY - state.startY;

            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) state.mouseHasMoved = true;

            const now = Date.now();
            const dt = Math.max(1, now - state.lastDragTime);
            
            const instantVelocityX = dx / dt;
            const instantVelocityY = dy / dt;
            state.dragVelocityX = (state.dragVelocityX * 0.6) + (instantVelocityX * 0.4);
            state.dragVelocityY = (state.dragVelocityY * 0.6) + (instantVelocityY * 0.4);

            state.lastDragTime = now;
            state.targetX += dx;
            state.targetY += dy;
            state.startX = e.clientX;
            state.startY = e.clientY;
        };

        const handleMouseUp = () => {
            if (!state.isDragging) return;
            state.isDragging = false;
            if (state.canDrag) {
                if (container) container.style.cursor = "grab";
                
                if (Math.abs(state.dragVelocityX) > 0.05 || Math.abs(state.dragVelocityY) > 0.05) {
                    state.targetX += state.dragVelocityX * 300; 
                    state.targetY += state.dragVelocityY * 300;
                }
                
                state.dragVelocityX = 0;
                state.dragVelocityY = 0;
            }
        };

        const handleTouchStart = (e) => {
            if (!state.canDrag) return;
            state.isDragging = true;
            state.mouseHasMoved = false;
            state.startX = e.touches[0].clientX;
            state.startY = e.touches[0].clientY;
            state.dragVelocityX = 0;
            state.dragVelocityY = 0;
        };

        const handleTouchMove = (e) => {
            if (!state.isDragging || !state.canDrag) return;
            const dx = e.touches[0].clientX - state.startX;
            const dy = e.touches[0].clientY - state.startY;
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) state.mouseHasMoved = true;

            const now = Date.now();
            const dt = Math.max(1, now - state.lastDragTime);
            
            const instantVelocityX = dx / dt;
            const instantVelocityY = dy / dt;
            state.dragVelocityX = (state.dragVelocityX * 0.6) + (instantVelocityX * 0.4);
            state.dragVelocityY = (state.dragVelocityY * 0.6) + (instantVelocityY * 0.4);

            state.lastDragTime = now;
            state.targetX += dx;
            state.targetY += dy;
            state.startX = e.touches[0].clientX;
            state.startY = e.touches[0].clientY;
        };

        const handleTouchEnd = () => {
            if (!state.isDragging) return;
            state.isDragging = false;
            if (state.canDrag) {
                if (Math.abs(state.dragVelocityX) > 0.05 || Math.abs(state.dragVelocityY) > 0.05) {
                    state.targetX += state.dragVelocityX * 300; 
                    state.targetY += state.dragVelocityY * 300;
                }
                state.dragVelocityX = 0;
                state.dragVelocityY = 0;
            }
        };

        const handleOverlayClick = () => {
            if (state.isExpanded) closeExpandedItem();
        };

        const handleResize = () => {
            const width = window.innerWidth;
            let newW = 120, newH = 160, newGap = 150;

            if (width > 1024) {
                // Large Desktop
                newW = 360; 
                newH = 480; 
                newGap = 250; // 🚀 Increased from 150 to 250
            } else if (width > 768) {
                // Tablet / Small Desktop
                newW = 240; 
                newH = 320; 
                newGap = 200; // 🚀 Increased from 120 to 200
            } else {
                // Mobile
                newW = 120; 
                newH = 160; 
                newGap = 150; // 🚀 Increased from 100 to 150
            }

            state.itemWidth = newW;
            state.itemHeight = newH;
            state.itemGap = newGap;
            
            setGridConfig({ itemWidth: newW, itemHeight: newH, itemGap: newGap });

            state.lastStartCol = null; 

            if (state.isExpanded && state.expandedItem) {
                const targetWidth = width > 768 ? width * 0.35 : width * 0.7;
                gsap.to(state.expandedItem, {
                    width: targetWidth,
                    height: targetWidth * (newH / newW), 
                    duration: 0.3,
                    ease: "power2.out",
                });
            } else {
                updateVisibleItems();
            }
        };

        handleResize();

        if (container) {
            container.addEventListener("mousedown", handleMouseDown);
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            container.addEventListener("touchstart", handleTouchStart, { passive: true });
            window.addEventListener("touchmove", handleTouchMove, { passive: true });
            window.addEventListener("touchend", handleTouchEnd);
        }
        if (overlay) overlay.addEventListener("click", handleOverlayClick);
        window.addEventListener("resize", handleResize);

        updateVisibleItems();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (visibilityThrottle) clearTimeout(visibilityThrottle);
            if (container) {
                container.removeEventListener("mousedown", handleMouseDown);
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
                container.removeEventListener("touchstart", handleTouchStart);
                window.removeEventListener("touchmove", handleTouchMove);
                window.removeEventListener("touchend", handleTouchEnd);
            }
            if (overlay) overlay.removeEventListener("click", handleOverlayClick);
            window.removeEventListener("resize", handleResize);
        };
    }, [updateVisibleItems, closeExpandedItem]);

    const { itemWidth, itemHeight, itemGap } = gridConfig;
    const { itemCount } = stateRef.current;

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
                                id={item.id}
                                col={item.col}
                                row={item.row}
                                itemWidth={itemWidth}
                                itemHeight={itemHeight}
                                itemGap={itemGap}
                                itemCount={itemCount}
                                onClick={handleItemClick}
                                isVisible={expandedItemId !== item.id}
                            />
                        ))}
                    </div>
                    <div
                        ref={overlayRef}
                        className="overlay fixed top-0 left-0 w-full h-full bg-white pointer-events-none transition-opacity duration-300 ease-in-out opacity-0 z-[2]"
                    />
                </div>
            </section>

            <PreloadImages />
        </div>
    );
};

export default Gallery;