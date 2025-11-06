"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const copy = {
  story: {
    vi: "Chúng tôi gặp nhau trong một buổi chiều mùa thu ở Praha, nơi những câu chuyện nhỏ bỗng hóa thành điều kỳ diệu. Từ những cuộc hẹn cà phê kéo dài tới những chuyến đi xa, chúng tôi học cách sẻ chia và lớn lên cùng nhau mỗi ngày. Đám cưới là lời hẹn ước cho những điều thật đẹp đang đợi phía trước.",
    cz: "Naše setkání začalo jedno podzimní odpoledne v Praze, kde se obyčejné příběhy proměnily v zázrak. Od dlouhých kávových schůzek po cesty daleko jsme se učili naslouchat, sdílet i růst spolu. Naše svatba je příslibem všeho krásného, co nás čeká.",
  },
  families: [
    {
      title: "NHÀ TRAI",
      subtitle: "Groom’s Family",
      members: ["Ông Đặng Đình Phụng", "Bà La Ngọc Oanh"],
    },
    {
      title: "NHÀ GÁI",
      subtitle: "Bride’s Family",
      members: ["Ông Trần Văn Sỹ", "Bà Phạm Thị Thơm"],
    },
  ],
} as const;

export default function StorySection() {
  const prefersReducedMotion = useReducedMotion();
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageParallax = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [24, -24]
  );

  const parallaxStyle = prefersReducedMotion ? undefined : { y: imageParallax };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease,
        when: "beforeChildren",
        staggerChildren: prefersReducedMotion ? 0 : 0.18,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.75,
        ease,
        delay: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const familiesVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease,
        staggerChildren: prefersReducedMotion ? 0 : 0.16,
      },
    },
  };

  const familyCardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.65,
        ease,
      },
    },
  };

  return (
    <motion.section
      id="story"
      data-scroll-section="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white min-h-dvh snap-start py-12"
    >
      <motion.div
        variants={containerVariants}
        className="mx-auto flex w-full max-w-5xl flex-col items-center gap-14 px-6 md:gap-16 md:px-12"
      >
        <motion.div
          variants={textVariants}
          className="max-w-4xl text-center"
        >
          <p className="font-sans text-base font-light leading-relaxed text-neutral-600 md:text-lg text-justify">
            {copy.story.vi}
            <span className="mt-4 block text-sm text-neutral-400 md:text-base">
              {copy.story.cz}
            </span>
          </p>
        </motion.div>

        <motion.div
          ref={imageRef}
          variants={imageVariants}
          className="w-full max-w-3xl"
        >
          <motion.div
            style={parallaxStyle}
            className="overflow-hidden rounded-[2rem] border border-neutral-100/70 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.1)]"
          >
            <div className="relative aspect-[3/2] w-full">
              <Image
                src="/2O4A9869.jpg"
                alt="Khoảnh khắc của Long và Yến"
                fill
                sizes="(max-width: 767px) 100vw, 720px"
                className="object-cover"
                priority={false}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={familiesVariants}
          className="grid w-full gap-6 text-center md:grid-cols-2 md:gap-9"
        >
          {copy.families.map((family) => (
            <motion.article
              key={family.title}
              variants={familyCardVariants}
              className="flex flex-col items-center rounded-[1.75rem] bg-white/70 px-8 py-10 shadow-[0_18px_38px_rgba(15,23,42,0.08)] ring-1 ring-neutral-100 md:px-10 md:py-12"
            >
              <p className="font-serif text-lg uppercase tracking-[0.36em] text-neutral-800 md:text-xl">
                {family.title}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.38em] text-zinc-500 md:text-sm">
                {family.subtitle}
              </p>
              <div className="mt-6 space-y-3">
                {family.members.map((member) => (
                  <p
                    key={member}
                    className="text-sm font-light uppercase tracking-[0.14em] text-neutral-500 md:text-base"
                  >
                    {member}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
