"use client";
import Hero from "@/components/hero/Hero";
import CoupleIntro from "@/components/couple/CoupleIntro";
import StorySection from "@/components/story/StorySection";
import VenueSection from "@/components/venue/VenueSection";
import WeddingCalendar from "@/components/calendar/WeddingCalendar";
import Album from "@/components/gallery/Album";
import RsvpFormSection from "@/components/rsvp/RsvpFormSection";
export default function Home() {
  // useEffect(() => {
  //   // Initialize Lenis smooth scroll
  //   const lenis = new Lenis({
  //     duration: SCROLL_DURATION,
  //     easing: scrollEasing,
  //     smoothWheel: false,
  //     smoothTouch: false,
  //   });

  //   (window as any).lenis = lenis;

  //   let animationFrameId = 0;
  //   let sections: HTMLElement[] = [];
  //   let sectionPositions: number[] = [];
  //   let currentIndex = 0;
  //   let isAnimating = false;
  //   let animationTimeout: number | null = null;
  //   let touchStartY = 0;

  //   const refreshSections = () => {
  //     sections = Array.from(
  //       document.querySelectorAll<HTMLElement>("[data-scroll-section]")
  //     );
  //     sectionPositions = sections.map((section) => section.offsetTop);
  //   };

  //   const getScrollValue = () => {
  //     const current = (lenis as unknown as { scroll?: number }).scroll;
  //     return typeof current === "number" ? current : window.scrollY;
  //   };

  //   const clampIndex = (index: number) =>
  //     Math.max(0, Math.min(index, sections.length - 1));

  //   const syncCurrentIndex = (scrollValue: number) => {
  //     if (!sections.length) return;
  //     let index = 0;
  //     for (let i = 0; i < sectionPositions.length; i += 1) {
  //       if (scrollValue >= sectionPositions[i] - window.innerHeight / 2) {
  //         index = i;
  //       }
  //     }
  //     currentIndex = index;
  //   };

  //   const releaseLock = () => {
  //     isAnimating = false;
  //     if (animationTimeout) {
  //       window.clearTimeout(animationTimeout);
  //       animationTimeout = null;
  //     }
  //   };

  //   const scrollToIndex = (index: number) => {
  //     if (!sections[index]) return;
  //     isAnimating = true;
  //     lenis.scrollTo(sections[index], {
  //       duration: SCROLL_DURATION,
  //       easing: scrollEasing,
  //     });
  //     currentIndex = index;
  //     if (animationTimeout) window.clearTimeout(animationTimeout);
  //     animationTimeout = window.setTimeout(releaseLock, SCROLL_TIMEOUT);
  //   };

  //   const onLenisScroll = ({ scroll }: { scroll: number }) => {
  //     if (!isAnimating) {
  //       syncCurrentIndex(scroll);
  //     }
  //   };

  //   const handleWheel = (event: WheelEvent) => {
  //     if (!sections.length) return;
  //     const delta = event.deltaY;
  //     if (Math.abs(delta) < 8) return;

  //     if (isAnimating) {
  //       event.preventDefault();
  //       return;
  //     }

  //     refreshSections();
  //     syncCurrentIndex(getScrollValue());

  //     const direction = delta > 0 ? 1 : -1;
  //     const nextIndex = clampIndex(currentIndex + direction);

  //     if (nextIndex === currentIndex) return;

  //     event.preventDefault();
  //     scrollToIndex(nextIndex);
  //   };

  //   const handleTouchStart = (event: TouchEvent) => {
  //     if (event.touches.length !== 1) return;
  //     touchStartY = event.touches[0].clientY;
  //   };

  //   const handleTouchMove = (event: TouchEvent) => {
  //     if (!sections.length || event.touches.length !== 1) return;
  //     const currentY = event.touches[0].clientY;
  //     const delta = touchStartY - currentY;

  //     if (Math.abs(delta) < 40) return;

  //     if (isAnimating) {
  //       event.preventDefault();
  //       return;
  //     }

  //     refreshSections();
  //     syncCurrentIndex(getScrollValue());

  //     const direction = delta > 0 ? 1 : -1;
  //     const nextIndex = clampIndex(currentIndex + direction);

  //     if (nextIndex === currentIndex) return;

  //     event.preventDefault();
  //     scrollToIndex(nextIndex);
  //     touchStartY = currentY;
  //   };

  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (!sections.length) return;
  //     const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "];
  //     if (!keys.includes(event.key)) return;

  //     event.preventDefault();
  //     if (isAnimating) return;

  //     refreshSections();
  //     syncCurrentIndex(getScrollValue());

  //     let direction = 0;
  //     if (
  //       event.key === "ArrowDown" ||
  //       event.key === "PageDown" ||
  //       event.key === " "
  //     ) {
  //       direction = 1;
  //     } else if (event.key === "ArrowUp" || event.key === "PageUp") {
  //       direction = -1;
  //     }

  //     const nextIndex = clampIndex(currentIndex + direction);
  //     if (nextIndex === currentIndex) return;

  //     scrollToIndex(nextIndex);
  //   };

  //   const raf = (time: number) => {
  //     lenis.raf(time);
  //     animationFrameId = requestAnimationFrame(raf);
  //   };

  //   const handleResize = () => {
  //     refreshSections();
  //     syncCurrentIndex(getScrollValue());
  //   };

  //   handleResize();
  //   lenis.on("scroll", onLenisScroll);

  //   window.addEventListener("wheel", handleWheel, { passive: false });
  //   window.addEventListener("touchstart", handleTouchStart, { passive: true });
  //   window.addEventListener("touchmove", handleTouchMove, { passive: false });
  //   window.addEventListener("keydown", handleKeyDown);
  //   window.addEventListener("resize", handleResize);

  //   animationFrameId = requestAnimationFrame(raf);

  //   return () => {
  //     cancelAnimationFrame(animationFrameId);
  //     window.removeEventListener("wheel", handleWheel);
  //     window.removeEventListener("touchstart", handleTouchStart);
  //     window.removeEventListener("touchmove", handleTouchMove);
  //     window.removeEventListener("keydown", handleKeyDown);
  //     window.removeEventListener("resize", handleResize);
  //     if (typeof (lenis as any).off === "function") {
  //       (lenis as any).off("scroll", onLenisScroll);
  //     }
  //     releaseLock();
  //     lenis.destroy();
  //     delete (window as any).lenis;
  //   };
  // }, []);

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
