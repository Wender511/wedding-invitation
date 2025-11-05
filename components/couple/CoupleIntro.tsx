"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const hoverEase = [0.22, 1, 0.36, 1] as const;

const copy = {
  heading: {
    primary:
      "\u0054\u0048\u01AF \u004D\u1EDC\u0049 \u0054\u0048\u0041\u004D \u0044\u1EF0 \u004C\u1EC4 \u0043\u01AF\u1EDA\u0049",
    secondary: "\u0053\u0056\u0041\u0054\u0045\u0042\u004E\u00CD \u0050\u004F\u005A\u0056\u00C1\u004E\u004B\u0041",
  },
  intro: {
    vi: "\u0054\u0072\u00E2\u006E\u0020\u0074\u0072\u1ECD\u006E\u0067\u0020\u006B\u00ED\u006E\u0068\u0020\u006D\u1EDD\u0069\u0020\u0111\u1EBF\u006E\u0020\u0064\u1EF1\u0020\u0062\u0075\u1ED5\u0069\u0020\u006C\u1EC5\u0020\u0063\u01B0\u1EDB\u0069\u0020\u0063\u1EE7\u0061",
    cz: "\u0053\u0072\u0064\u0065\u010D\u006E\u011B\u0020\u0056\u00E1\u0073\u0020\u007A\u0076\u0065\u006D\u0065\u0020\u006E\u0061\u0020\u006E\u00E1\u0161\u0020\u0076\u00FD\u007A\u006E\u0061\u006D\u006E\u00FD\u0020\u0064\u0065\u006E",
  },
  groom: {
    label: "\u0043\u0068\u00FA\u0020\u0072\u1EC3",
    labelCz: "\u017D\u0065\u006E\u0069\u0063\u0068",
    name: "\u0054\u0055\u1EA4\u004E\u0020\u004E\u0047\u0055\u0059\u1EC4\u004E",
    image: "/2O4A0071.jpg",
    alt: "\u0043\u0068\u00FA\u0020\u0072\u1EC3\u0020\u0054\u0075\u1EA5\u006E\u0020\u004E\u0067\u0075\u1EC7\u006E",
  },
  bride: {
    label: "\u0043\u00F4\u0020\u0064\u00E2\u0075",
    labelCz: "\u006E\u0065\u0076\u011B\u0073\u0074\u0061",
    name: "\u0048\u0055\u0059\u1EC0\u004E\u0020\u004C\u00CA",
    image: "/2O4A9965.jpg",
    alt: "\u0043\u00F4\u0020\u0064\u00E2\u0075\u0020\u0048\u0075\u0079\u1EC1\u006E\u0020\u004C\u00CA",
  },
} as const;

export default function CoupleIntro() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease,
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 24,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease,
      },
    },
  };

  const cardsContainerVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 24,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 18,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease,
      },
    },
  };

  const groomRotation = prefersReducedMotion ? 0 : -1.5;
  const brideRotation = prefersReducedMotion ? 0 : 1.5;

  const getHoverProps = (baseRotation: number) =>
    prefersReducedMotion
      ? {}
      : {
          whileHover: {
            rotate: baseRotation > 0 ? baseRotation - 2 : baseRotation + 2,
            y: -6,
            boxShadow: "0 24px 40px rgba(15, 23, 42, 0.18)",
            transition: { duration: 0.25, ease: hoverEase },
          },
          whileTap: {
            rotate: baseRotation > 0 ? baseRotation - 2 : baseRotation + 2,
            y: -6,
            boxShadow: "0 24px 40px rgba(15, 23, 42, 0.18)",
          },
        };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className="bg-white py-16 md:py-24"
    >
      <motion.div
        variants={containerVariants}
        className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-6 md:gap-12 md:px-10"
      >
        <motion.div
          variants={textVariants}
          className="flex flex-col items-center gap-2 text-center"
        >
          <p className="font-serif text-[0.7rem] uppercase tracking-[0.4em] text-neutral-500 md:text-xs">
            {copy.heading.primary}
          </p>
          <p className="font-serif text-[0.7rem] uppercase tracking-[0.4em] text-neutral-400 md:text-xs">
            {copy.heading.secondary}
          </p>
        </motion.div>

        <motion.div
          variants={textVariants}
          className="flex flex-col items-center gap-5 text-center"
        >
          <div className="h-8 w-px bg-neutral-300" />
          <p className="max-w-xl font-sans text-sm font-light leading-relaxed text-neutral-500 md:text-base">
            {copy.intro.vi}
            <span className="mt-1 block text-neutral-400">{copy.intro.cz}</span>
          </p>
        </motion.div>
        {/* change */}
        <motion.div
          variants={cardsContainerVariants}
          className="grid w-full gap-8 md:grid-cols-2 md:gap-12"
        >
          <motion.article
            variants={cardVariants}
            className="flex flex-col overflow-hidden rounded-[1.75rem]"
            // style={{ rotate: groomRotation }}
            // {...getHoverProps(groomRotation)}
          >
            <div className="px-6 pb-6 pt-8 text-center md:px-7">
              <p className="text-sm italic text-neutral-500 md:text-base">
                {copy.groom.label}{" "}
                <span className="ml-2 text-xs uppercase tracking-[0.4em] text-neutral-400 md:text-[0.7rem]">
                  {copy.groom.labelCz}
                </span>
              </p>
              <p className="mt-3 font-serif text-2xl font-semibold uppercase tracking-[0.25em] text-neutral-800 md:text-[2.1rem]">
                {copy.groom.name}
              </p>
            </div>
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={copy.groom.image}
                alt={copy.groom.alt}
                fill
                sizes="(max-width: 767px) 80vw, 320px"
                className="object-cover"
                priority
              />
            </div>
          </motion.article>

          <motion.article
            variants={cardVariants}
            className="flex flex-col overflow-hidden rounded-[1.75rem]"
            // style={{ rotate: brideRotation }}
            // {...getHoverProps(brideRotation)}
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={copy.bride.image}
                alt={copy.bride.alt}
                fill
                sizes="(max-width: 767px) 80vw, 320px"
                className="object-cover"
              />
            </div>
            <div className="px-6 pb-6 pt-8 text-center md:px-7">
              <p className="text-sm italic text-neutral-500 md:text-base">
                {copy.bride.label}{" "}
                <span className="ml-2 text-xs uppercase tracking-[0.4em] text-neutral-400 md:text-[0.7rem]">
                  {copy.bride.labelCz}
                </span>
              </p>
              <p className="mt-3 font-serif text-2xl font-semibold uppercase tracking-[0.25em] text-neutral-800 md:text-[2.1rem]">
                {copy.bride.name}
              </p>
            </div>
          </motion.article>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
