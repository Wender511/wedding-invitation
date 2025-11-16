"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { useMotionPresets } from "@/hooks/useMotionPresets";

const stackedPhotos = [
  { src: "/2O4A9965.jpg", alt: "Bride holding bouquet" },
  { src: "/2O4A9956.jpg", alt: "Couple smiling together" },
  { src: "/2O4A9844.jpg", alt: "Bride resting on sofa" },
  { src: "/2O4A9985.jpg", alt: "Couple embracing outdoors" },
] as const;

export default function Test() {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const { baseTransition, prefersReducedMotion } = useMotionPresets();
  const isStackInView = useInView(stackRef, {
    once: true,
    amount: 0.55,
    margin: "0px 0px -10% 0px",
  });

  return (
    <section
      id="hero"
      data-scroll-section="true"
      className="relative min-h-dvh snap-start overflow-hidden"
    >
      <div className="relative mx-auto flex w-full max-w-3xl rounded-3xl">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/2O4A0269.jpg"
            alt="Wedding hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center "
          />
          <div className="absolute inset-0 bg-linear-to-l from-black/60 via-black/35 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl items-stretch px-4 py-10 sm:px-8">
          <div
            ref={stackRef}
            className="ml-auto flex h-full w-full max-w-[340px] flex-col gap-3 sm:max-w-[360px]"
          >
            {stackedPhotos.map((photo, index) => {
              const delayOrder = stackedPhotos.length - index - 1; // animate from bottom to top
              return (
                <motion.div
                  key={photo.src}
                  className="relative flex-1 overflow-hidden rounded-[28px] border border-white/15 bg-white/5 shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
                  initial={
                    prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                  }
                  animate={
                    prefersReducedMotion || isStackInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 24 }
                  }
                  transition={{
                    ...baseTransition,
                    delay: prefersReducedMotion ? 0 : delayOrder * 0.12,
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 72vw, 320px"
                    className="object-cover object-center"
                    priority={index === 0}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
