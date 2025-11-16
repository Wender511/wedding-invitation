"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import { useMotionPresets } from "@/hooks/useMotionPresets";

const monthName = "December";
const year = 2025;
const backgroundImage = '/2O4A9956.jpg';

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;
const daysInMonth = Array.from({ length: 31 }, (_, index) => index + 1);

export default function WeddingCalendar() {
  const { viewport, prefersReducedMotion, baseTransition, slideFade } = useMotionPresets();

  const sectionVariants = slideFade({ direction: "up", offset: 36, duration: 0.7 });

  const dayVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 12,
    },
    show: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...baseTransition,
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : 0.2 + index * 0.02,
      },
    }),
  };

  return (
    <motion.section
      id="calendar"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={sectionVariants}
      className="bg-linear-to-b from-rose-50/70 via-white to-rose-50/60 py-12 md:py-10 h-[100dvh] md:h-dvh snap-start"
    >
      <div className="mx-auto flex w-full flex-col items-center gap-10 md:gap-12 px-6 md:px-10 max-w-4xl h-full">
        <div className="relative w-full overflow-hidden rounded-[2.25rem] shadow-xl h-full">
          <div className="relative w-full h-full">
            <Image
              src={backgroundImage}
              alt={`${monthName} ${year} calendar background`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 bg-black/30" aria-hidden />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8 text-white md:px-16 md:py-12">
              <div className="flex flex-col items-center gap-1">
                <p className="font-script text-5xl leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] md:text-[4.75rem]">
                  {monthName}
                </p>
                <p className="text-[1rem] uppercase tracking-[0.65em] text-white/75 md:text-base md:tracking-[0.7em]">
                  &nbsp; {year.toString()}
                </p>
              </div>

              <div className="mt-8 flex w-full max-w-[85%] flex-col items-center gap-4 md:mt-10 md:gap-6">
                <div className="grid w-full grid-cols-7 place-items-center gap-y-2 text-[0.58rem] font-medium uppercase tracking-[0.4em] text-white/85 md:text-sm md:tracking-[0.45em] ">
                  {weekDays.map((weekday) => (
                    <span key={weekday} className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                      {weekday}
                    </span>
                  ))}
                </div>

                <div className="grid w-full grid-cols-7 place-items-center gap-y-3 text-center md:gap-y-5 ">
                  {daysInMonth.map((day, index) => {
                    const isEventDay = day === 6;

                    return (
                      <motion.div
                        key={day}
                        variants={dayVariants}
                        custom={index}
                        className={`relative flex h-8 w-full items-center justify-center text-[0.65rem] font-medium ${
                          isEventDay ? 'text-neutral-900' : 'text-white'
                        } md:h-10 md:text-base`}
                        aria-label={
                          isEventDay
                            ? `Wedding celebration on ${monthName} ${day}, ${year}`
                            : undefined
                        }
                      >
                        {isEventDay ? (
                          <motion.span
                            className="pointer-events-none absolute inset-0 flex items-center justify-center"
                            animate={prefersReducedMotion ? undefined : { scale: [1, 1.15, 1] }}
                            transition={
                              prefersReducedMotion
                                ? undefined
                                : {
                                    duration: 1.45,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                  }
                            }
                            aria-hidden="true"
                          >
                            <Heart
                              className="h-9 w-9 text-white md:h-12 md:w-12"
                              fill="currentColor"
                              stroke="none"
                            />
                          </motion.span>
                        ) : null}
                        <span
                          className={`relative z-10 ${
                            isEventDay
                              ? 'text-neutral-900'
                              : 'drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]'
                          }`}
                        >
                          {day}
                        </span>
                        {isEventDay ? (
                          <span className="sr-only">
                            Wedding celebration on {monthName} {day}, {year}
                          </span>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
