"use client";

import React, { useState, useRef, useEffect } from "react";

export function ProductImageSwipe({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);

  // Ensure we have at least one image
  const displayImages = images.length > 0 ? images : [images[0] || ''];

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0 && currentIndex > 0) {
        // Swipe right - go to previous image
        setCurrentIndex(currentIndex - 1);
      } else if (translateX < 0 && currentIndex < displayImages.length - 1) {
        // Swipe left - go to next image
        setCurrentIndex(currentIndex + 1);
      }
    }
    
    setIsDragging(false);
    setTranslateX(0);
  };

  // Mouse handlers for desktop
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const threshold = 50;
    
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (translateX < 0 && currentIndex < displayImages.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    
    setIsDragging(false);
    setTranslateX(0);
  };

  // Auto-disable mouse events when mouse leaves
  useEffect(() => {
    const handleMouseLeave = () => {
      setIsDragging(false);
      setTranslateX(0);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => container.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, []);

  if (displayImages.length === 0) return null;
  if (displayImages.length === 1) {
    return (
      <div className="flex justify-center">
        <img
          src={displayImages[0]}
          alt="Product"
          className="w-full max-w-md object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Image Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsDragging(false);
          setTranslateX(0);
        }}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex justify-center"
            >
              <img
                src={image}
                alt={`Product view ${index + 1}`}
                className="w-full max-w-md object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      {displayImages.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-como'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      {displayImages.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {currentIndex < displayImages.length - 1 && (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </>
      )}

      {/* Swipe hint text (mobile only) */}
      {displayImages.length > 1 && (
        <p className="text-center text-xs text-gray-500 mt-2 md:hidden">
          Desliza para ver más imágenes
        </p>
      )}
    </div>
  );
}

