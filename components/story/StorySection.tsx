"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { useMotionPresets } from "@/hooks/useMotionPresets";

const copy = {
  story: {
    vi: 'Chúng tôi gặp nhau bằng những lời thách thức ngây ngô của tuổi trẻ. Từ những ngày chỉ là bạn, chưa có chút tình cảm, rồi dần học cách quan tâm, thấu hiểu và cùng nhau vượt qua mọi khó khăn. Từ tà áo dài năm ấy đến váy cưới hôm nay — 5 năm không quá dài, nhưng đủ để chúng tôi nhận ra: hạnh phúc đôi khi bắt đầu từ những điều rất giản dị — một ánh nhìn, một câu nói, hay chỉ là… một lời nói đùa ngày hôm ấy ',
    cz: 'We met through the playful challenges of youth. From the days when we were just friends — no feelings, no promises — to the moments we learned to care, to understand, and to walk together through every joy and hardship. From the white áo dài — the Vietnamese school dress — to today’s wedding gown, five years may not be long, but it has been enough for us to realize that happiness often begins with the simplest things — a glance, a word… or just a teasing joke on that very first day.'
  },
  families: [
    {
      title: 'NHÀ TRAI',
      subtitle: 'Groom’s Family',
      members: ['Ông Đặng Đình Phụng', 'Bà La Ngọc Oanh'],
      isBride: false,
    },
    {
      title: 'NHÀ GÁI',
      subtitle: 'Bride’s Family',
      members: ['Ông Trần Văn Sỹ', 'Bà Phạm Thị Thơm'],
      isBride: true,
    }
  ]
} as const;

export default function StorySection() {
  const {
    fadeIn,
    container,
    viewport,
    prefersReducedMotion,
    slideFade,
    spinIn,
  } = useMotionPresets();
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

  const containerVariants = container({ offset: 0, duration: 0.6, staggerChildren: 0.18 });
  const textVariants = slideFade({ direction: "up", offset: 28, duration: 0.7 });
  const imageFrameVariants = fadeIn({ offset: 12, duration: 0.7, delay: 0.05 });
  const imageSpinVariants = spinIn({ rotate: -14, initialScale: 0.9, duration: 0.85, delay: 0.08 });
  const familiesVariants = container({ offset: 20, duration: 0.8, staggerChildren: 0.18 });
  const familyLeftVariants = slideFade({ direction: "left", offset: 24, duration: 0.65 });
  const familyRightVariants = slideFade({ direction: "right", offset: 24, duration: 0.65 });

  return (
    <motion.section
      id="story"
      data-scroll-section="true"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="bg-linear-to-b from-rose-50/70 via-white to-rose-50/60 py-12 md:py-10 min-h-dvh snap-start "
    >
      <motion.div
        variants={containerVariants}
        className="mx-auto flex w-full flex-col items-center gap-10 md:gap-12 px-6 md:px-10 max-w-4xl"
      >
        <motion.div variants={textVariants} className="max-w-4xl text-center">
          <p className="font-sans text-base font-light leading-relaxed text-neutral-600 md:text-lg text-justify">
            {copy.story.vi}
            <span className="mt-4 block text-sm text-neutral-400 md:text-base">
              {copy.story.cz}
            </span>
          </p>
        </motion.div>

        <motion.div ref={imageRef} variants={imageFrameVariants} className="w-full max-w-4xl">
          <motion.div
            variants={imageSpinVariants}
            style={parallaxStyle}
            className="overflow-hidden rounded-4xl border border-neutral-100/70 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.1)]"
          >
            <div className="relative aspect-4/3 md:block hidden w-full">
              <Image
                src="/story/2O4A9869.jpg"
                alt="Khoảnh khắc của Long và Yến"
                fill
                sizes="(max-width: 767px) 100vw, 720px"
                className="object-cover"
                priority={false}
                unoptimized
              />
            </div>
            <div className="relative aspect-[1] w-full md:hidden block">
              <Image
                src="/story/2O4A9869-mobile.jpg"
                alt="Khoảnh khắc của Long và Yến"
                fill
                sizes="(max-width: 767px) 100vw, 720px"
                className="object-cover"
                priority={false}
                unoptimized
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={familiesVariants}
          className="grid w-full grid-cols-2 gap-4 text-center sm:gap-6 md:gap-9"
        >
          {copy.families.map((family) => (
            <motion.article
              key={family.title}
              variants={family.isBride ? familyRightVariants : familyLeftVariants}
              className="flex flex-col items-center rounded-3xl bg-white/70 px-0 py-6 shadow-[0_18px_38px_rgba(15,23,42,0.08)] ring-1 ring-neutral-100 sm:px-6 sm:py-8 md:rounded-[1.75rem] md:px-10 md:py-12"
            >
              <p className="font-serif text-sm uppercase tracking-[0.36em] text-neutral-800 sm:text-base md:text-xl">
                {family.title}
              </p>
              <p className="mt-2 text-[0.55rem] uppercase tracking-[0.38em] text-zinc-500 sm:text-xs md:text-sm">
                {family.subtitle}
              </p>
              <div className="mt-4 flex flex-col space-y-2 sm:mt-6 sm:space-y-3 w-full">
                {family.members.map((member) => {
                  const memberClasses = [
                    'text-[0.65rem] font-light uppercase tracking-[0.14em] text-neutral-500 sm:text-xs md:text-base',
                    family.isBride ? 'mt-auto sm:mt-0' : ''
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <p key={member} className={memberClasses}>
                      {member}
                    </p>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
