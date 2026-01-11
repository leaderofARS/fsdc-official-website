import React, { useState, useEffect, useRef } from "react";

/**
 * RevealOnScroll Component
 * Detects when an element enters the viewport and triggers a CSS transition.
 * * @param {ReactNode} children - The content to be revealed.
 * @param {string} delay - CSS transition delay (e.g., "200ms").
 * @param {string} direction - Entrance direction: "up", "left", or "right".
 */
const RevealOnScroll = ({ children, delay = "0ms", direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stop observing once the element is visible to save resources
            observer.unobserve(domRef.current);
          }
        });
      },
      { 
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset for better timing
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Helper function to handle directional transforms
  const getTransform = () => {
    if (isVisible) return "translate(0, 0) opacity-100";
    switch (direction) {
      case "left": return "-translate-x-12 opacity-0";
      case "right": return "translate-x-12 opacity-0";
      default: return "translate-y-12 opacity-0";
    }
  };

  return (
    <div
      ref={domRef}
      style={{ 
        transitionDelay: delay,
        willChange: "transform, opacity" // Hardware acceleration for mobile
      }}
      className={`transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) transform ${getTransform()}`}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;