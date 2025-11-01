"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "@/components/hero/Hero";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Make lenis available globally for the hook
    (window as any).lenis = lenis;

    // Animation frame function
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />

      {/* RSVP Section Placeholder */}
      <section
        id="rsvp"
        className="min-h-screen flex items-center justify-center bg-neutral-50"
      >
        <div className="text-center">
          <h2 className="font-heading text-4xl md:text-6xl text-neutral-800 mb-4">
            RSVP
          </h2>
          <p className="text-lg text-neutral-600">
            Form sẽ được thêm ở bước tiếp theo
          </p>
        </div>
      </section>
    </main>
  );
}
