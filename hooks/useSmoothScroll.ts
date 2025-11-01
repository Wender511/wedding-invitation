"use client";

import { useCallback } from "react";

export function useSmoothScroll() {
  const scrollTo = useCallback((target: string | Element) => {
    let element: Element | null = null;
    
    if (typeof target === 'string') {
      element = document.querySelector(target);
    } else {
      element = target;
    }
    
    if (!element) return;

    // Check if Lenis is available globally
    const lenis = (window as any).lenis;
    
    if (lenis && typeof lenis.scrollTo === 'function') {
      // Use Lenis for smooth scroll
      lenis.scrollTo(element, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      // Fallback to native smooth scroll
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  }, []);

  return { scrollTo };
}
