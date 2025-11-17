"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Autoplay,
  EffectFade,
  Keyboard,
  Navigation,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { albumPhotos } from "@/data/photos";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMotionPresets } from "@/hooks/useMotionPresets";
const MAIN_RATIO = 'aspect-3/4';

export default function Album() {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isDesktopView, setIsDesktopView] = useState(false);

  const safeThumbsSwiper = useMemo(
    () => (thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null),
    [thumbsSwiper]
  );

  const detailPhotos = albumPhotos.detail;
  const detailCount = detailPhotos.length;
  const openModalAt = useCallback(
    (index: number) => {
      if (!detailCount) return;
      setModalIndex(index % detailCount);
      setIsDialogOpen(true);
    },
    [detailCount]
  );

  const showPrevModal = useCallback(() => {
    if (!detailCount) return;
    setModalIndex((prev) => (prev - 1 + detailCount) % detailCount);
  }, [detailCount]);

  const showNextModal = useCallback(() => {
    if (!detailCount) return;
    setModalIndex((prev) => (prev + 1) % detailCount);
  }, [detailCount]);

  const displayPhotos = isDesktopView ? albumPhotos.desktop : albumPhotos.mobile;

  const handleThumbClick = useCallback(
    (index: number) => {
      if (mainSwiper) {
        if (mainSwiper.params.loop) {
          mainSwiper.slideToLoop(index);
        } else {
          mainSwiper.slideTo(index);
        }
      }
    },
    [mainSwiper]
  );

  const handleKeyActivate = useCallback(
    (event: KeyboardEvent<HTMLElement>, action: () => void) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        action();
      }
    },
    []
  );

  const { container, viewport, scaleIn, slideFade } = useMotionPresets();
  const galleryVariants = container({ offset: 24, duration: 0.6, staggerChildren: 0.12 });
  const mainCarouselVariants = scaleIn({ initialScale: 0.92, duration: 0.6 });
  const thumbVariants = slideFade({ direction: "up", offset: 20, delay: 0.1, duration: 0.55 });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateMatches = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsDesktopView(event.matches);
    };
    updateMatches(mediaQuery);

    const listener = (event: MediaQueryListEvent) => updateMatches(event);
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }

    mediaQuery.addListener(listener);
    return () => mediaQuery.removeListener(listener);
  }, []);

  return (
    <motion.section
      id="album-gallery"
      data-scroll-section="true"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="bg-linear-to-b from-rose-50/70 via-white to-rose-50/60 py-12 md:py-10 h-[85dvh] md:h-dvh snap-start"
    >
      <motion.div
        variants={galleryVariants}
        className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 md:gap-3 px-6 md:px-10 h-full"
      >
        <motion.div
          variants={mainCarouselVariants}
          className={cn(
            'relative w-full overflow-hidden rounded-2xl bg-neutral-900/40 h-full',
            MAIN_RATIO
          )}
        >
          <Swiper
            modules={[EffectFade, Autoplay, Navigation, Keyboard, Thumbs]}
            effect="fade"
            loop
            navigation
            keyboard={{ enabled: true }}
            // autoplay={{ delay: 3600, disableOnInteraction: false }}
            autoplay={false}
            thumbs={{ swiper: safeThumbsSwiper }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => setMainSwiper(swiper)}
            className="h-full w-full"
            allowTouchMove
            grabCursor
            style={
              {
                '--swiper-navigation-color': '#ffffff'
              } as CSSProperties
            }
          >
            {displayPhotos.map((photo, index) => (
              <SwiperSlide key={photo.id} className="flex">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openModalAt(index)}
                  onKeyDown={(event) => handleKeyActivate(event, () => openModalAt(index))}
                  className="block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  aria-label={`Phóng to ảnh ${index + 1}`}
                >
                  <div className={cn('relative h-full w-full overflow-hidden rounded-2xl')}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 720px"
                      className="object-cover object-center"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        <motion.div variants={thumbVariants} className="relative w-full">
          <Swiper
            modules={[Navigation, Thumbs, Keyboard]}
            onSwiper={setThumbsSwiper}
            watchSlidesProgress
            slidesPerView="auto"
            spaceBetween={12}
            slideToClickedSlide
            className="album-thumbs"
            keyboard={{ enabled: true }}
            breakpoints={{
              0: { spaceBetween: 10 },
              768: { spaceBetween: 12 }
            }}
            allowTouchMove
            grabCursor
          >
            {displayPhotos.map((photo, index) => (
              <SwiperSlide
                key={`thumb-${photo.id}`}
                className="h-auto! w-auto!"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleThumbClick(index)}
                  onKeyDown={(event) => handleKeyActivate(event, () => handleThumbClick(index))}
                  className={cn(
                    'block cursor-pointer overflow-hidden rounded-xl border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
                    activeIndex === index
                      ? 'border-white shadow-[0_0_0_2px_rgba(255,255,255,0.25)]'
                      : 'border-transparent hover:border-white/70'
                  )}
                  aria-label={`Chọn ảnh ${index + 1}`}
                >
                  <div className="relative aspect-square w-18 md:w-24">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover object-center rounded-xl"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}  >
        <DialogContent className="border-none bg-transparent p-0 shadow-none">
          <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center gap-4">
            {detailCount > 0 && (
              <div className={cn('relative w-full overflow-hidden rounded-2xl', MAIN_RATIO)}>
                <Image
                  src={detailPhotos[modalIndex].src}
                  alt={detailPhotos[modalIndex].alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 640px"
                  className="object-cover object-center"
                />
              </div>
            )}

            <button
              type="button"
              className="group absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white transition hover:border-white hover:bg-black/80"
              onClick={showPrevModal}
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="group absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white transition hover:border-white hover:bg-black/80"
              onClick={showNextModal}
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.section>
  );
}
