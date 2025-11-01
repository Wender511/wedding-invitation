"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 400], [0, 18]); // parallax nền nhẹ

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      // disable parallax nếu cần
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-dvh overflow-hidden">
      {/* Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <Image
          src="/2O4A0125.jpg"
          alt="Wedding hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:object-[50%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/55" />
      </motion.div>

      {/* Overlay Text */}
      <div className="relative z-10 flex min-h-dvh flex-col">
        {/* Caption */}

        <div className="flex-1" />

        {/* Main Text */}
        <div className="px-6 pb-[max(2.5rem))]">
          <motion.h1
            initial={{ opacity: 0, y: 24, letterSpacing: "0.06em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0em" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-script text-4xl md:text-6xl text-white"
            style={{
              textShadow:
                "0 2px 12px rgba(0,0,0,.45), 0 1px 2px rgba(0,0,0,.25)",
            }}
          >
            We get married!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 text-center font-serif text-sm md:text-base tracking-[0.25em] text-white/95"
            style={{
              textShadow: "0 1px 6px rgba(0,0,0,.4)",
            }}
          >
            Hoàng Long
            <br className="md:hidden" />
            <span className="hidden md:inline"> &nbsp;•&nbsp; </span>
            Ngọc Yến
          </motion.p>
        </div>
      </div>
    </section>
  );
}
