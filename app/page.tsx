"use client";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import Hero from "@/components/hero/Hero";
import CoupleIntro from "@/components/couple/CoupleIntro";
import StorySection from "@/components/story/StorySection";
import VenueSection from "@/components/venue/VenueSection";
import WeddingCalendar from "@/components/calendar/WeddingCalendar";
import Album from "@/components/gallery/Album";
import RsvpFormSection from "@/components/rsvp/RsvpFormSection";

type LenisWindow = Window & { lenis?: Lenis };
export default function Home() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (prefersReducedMotion.matches) {
      return;
    }

    const lenis = new Lenis({
      // smoothWheel: true,
      // syncTouch: true,
      // syncTouchLerp: 0.5,
      // touchInertiaMultiplier: 5,
      // lerp: 0.2,
      // touchMultiplier:1
    });

    const lenisWindow = window as LenisWindow;
    lenisWindow.lenis = lenis;

    const rootElement = document.documentElement;
    const previousScrollBehavior = rootElement.style.scrollBehavior;
    rootElement.style.scrollBehavior = "auto";

    let animationFrameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    // const handleResize = () => {
    //   lenis.resize();
    // };

    // window.addEventListener("resize", handleResize);

    return () => {
      // window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (lenisWindow.lenis === lenis) {
        delete lenisWindow.lenis;
      }
      rootElement.style.scrollBehavior = previousScrollBehavior;
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      <CoupleIntro />
      <StorySection />
      <VenueSection />
      <WeddingCalendar />
      <Album />
      <RsvpFormSection />
    </main>
  );
}
