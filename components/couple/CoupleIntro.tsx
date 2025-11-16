"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useMotionPresets } from "@/hooks/useMotionPresets";
// const copy = {
//   heading: {
//     primary: 'Thư mời tham dự lễ cưới',
//     secondary: 'Invitation to the Wedding Ceremony'
//   },
//   intro: {
//     vi: 'Trân trọng kính mời đến dự buổi lễ cưới của',
//     cz: 'We cordially invite you to attend the wedding ceremony of'
//   },
//   groom: {
//     label: 'Chú rể',
//     labelCz: '\u017D\u0065\u006E\u0069\u0063\u0068',
//     name: '\u0054\u0055\u1EA4\u004E\u0020\u004E\u0047\u0055\u0059\u1EC4\u004E',
//     image: '',
//     alt: '\u0043\u0068\u00FA\u0020\u0072\u1EC3\u0020\u0054\u0075\u1EA5\u006E\u0020\u004E\u0067\u0075\u1EC7\u006E'
//   },
//   bride: {
//     label: '\u0043\u00F4\u0020\u0064\u00E2\u0075',
//     labelCz: '\u006E\u0065\u0076\u011B\u0073\u0074\u0061',
//     name: '\u0048\u0055\u0059\u1EC0\u004E\u0020\u004C\u00CA',
//     image: '/2O4A9965.jpg',
//     alt: '\u0043\u00F4\u0020\u0064\u00E2\u0075\u0020\u0048\u0075\u0079\u1EC1\u006E\u0020\u004C\u00CA'
//   }
// } as const;

export default function CoupleIntro() {
  const { container, viewport, slideFade, scaleIn } = useMotionPresets();

  const containerVariants = container({ offset: 0, duration: 0.5, staggerChildren: 0.15 });
  const headingVariants = slideFade({ direction: "up", offset: 22, duration: 0.65 });
  const introVariants = scaleIn({ initialScale: 0.94, duration: 0.65, delay: 0.05 });
  const cardsContainerVariants = container({
    offset: 24,
    duration: 0.7,
    delayChildren: 0.1,
    staggerChildren: 0.12,
  });
  const groomCardVariants = slideFade({ direction: "left", offset: 26, duration: 0.65 });
  const brideCardVariants = slideFade({ direction: "right", offset: 26, duration: 0.65 });

  return (
    <motion.section
      id="couple"
      data-scroll-section="true"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="bg-linear-to-b from-rose-50/70 via-white to-rose-50/60 py-12 md:py-10 min-h-dvh snap-start"
    >
      <motion.div
        variants={containerVariants}
        className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 md:gap-10 px-6 md:px-10"
      >
        <motion.div
          variants={headingVariants}
          className="flex flex-col items-center gap-2 text-center"
        >
          <p className="font-serif text-[0.7rem] uppercase tracking-[0.4em] text-neutral-500 md:text-xs">
            Thư mời tham dự lễ cưới
          </p>
          <p className="font-serif text-[0.7rem] uppercase tracking-[0.4em] text-neutral-400 md:text-xs">
            Invitation to the Wedding Ceremony
          </p>
        </motion.div>

        <motion.div
          variants={introVariants}
          className="flex flex-col items-center gap-5 text-center"
        >
          <div className="h-8 w-px bg-neutral-300" />
          <p className="max-w-xl font-sans text-sm font-light leading-relaxed text-neutral-500 md:text-base">
            Trân trọng kính mời đến dự buổi lễ cưới của
            <span className="mt-1 block text-neutral-400">
              We cordially invite you to attend the wedding ceremony of
            </span>
          </p>
        </motion.div>
        {/* change */}
        <motion.div
          variants={cardsContainerVariants}
          className="grid w-full grid-cols-2 gap-4 sm:gap-6 md:gap-12"
        >
          <motion.article
            variants={groomCardVariants}
            className="flex flex-col overflow-hidden rounded-3xl"
            // style={{ rotate: groomRotation }}
            // {...getHoverProps(groomRotation)}
          >
            <div className="px-3 pb-4 pt-6 text-center md:px-7 md:pb-6 md:pt-8">
              <p className="text-xs italic text-neutral-500 sm:text-sm md:text-base">
                Chú rể
                <span className="ml-2 text-[0.6rem] uppercase tracking-[0.4em] text-neutral-400 sm:text-xs md:text-[0.7rem]">
                  Groom
                </span>
              </p>
              <p className="mt-2 text-xl font-semibold uppercase tracking-[0.25em] text-neutral-800 sm:mt-3 sm:text-2xl md:text-[2.1rem]">
                Hoàng Long
              </p>
            </div>
            <div className="relative aspect-3/4 w-full hidden md:block">
              <Image
                src="/coupleIntro/2O4A0200-md.jpg"
                alt="Chú rể Hoàng Long"
                fill
                sizes="(max-width: 767px) 45vw, 320px"
                className="rounded-3xl object-cover"
                priority
                unoptimized
              />
            </div>
            <div className="relative aspect-3/6 w-full md:hidden">
              <Image
                src="/coupleIntro/2O4A0200.jpg"
                alt="Chú rể Hoàng Long"
                fill
                sizes="(max-width: 767px) 45vw, 320px"
                className="rounded-3xl object-cover"
                priority
              />
            </div>
          </motion.article>

          <motion.article
            variants={brideCardVariants}
            className="flex flex-col overflow-hidden rounded-3xl"
            // style={{ rotate: brideRotation }}
            // {...getHoverProps(brideRotation)}
          >
            <div className="relative aspect-3/4 w-full hidden md:block">
              <Image
                src="/coupleIntro/2O4A0174-md.jpg"
                alt="Cô dâu Ngọc Yến"
                fill
                sizes="(max-width: 767px) 45vw, 320px"
                className="rounded-3xl object-cover"
                unoptimized
              />
            </div>
            <div className="relative aspect-3/6 w-full md:hidden">
              <Image
                src="/coupleIntro/2O4A0174.jpg"
                alt="Cô dâu Ngọc Yến"
                fill
                sizes="(max-width: 767px) 45vw, 320px"
                className="rounded-3xl object-cover"
              />
            </div>
            <div className="px-3 pb-4 pt-6 text-center md:px-7 md:pb-6 md:pt-8">
              <p className="text-xs italic text-neutral-500 sm:text-sm md:text-base">
                Cô dâu
                <span className="ml-2 text-[0.6rem] uppercase tracking-[0.4em] text-neutral-400 sm:text-xs md:text-[0.7rem]">
                  Bride
                </span>
              </p>
              <p className="mt-2 text-xl font-semibold uppercase tracking-[0.25em] text-neutral-800 sm:mt-3 sm:text-2xl md:text-[2.1rem]">
                Ngọc Yến
              </p>
            </div>
          </motion.article>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
