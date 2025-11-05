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
          src="/2O4A0091-mobile.jpg"
          alt="Wedding hero"
          fill
          priority
          sizes="(min-width: 768px) 0vw, 100vw"
          className="object-cover object-center md:hidden"
        />
        <Image
          src="/2O4A0125-pc.jpg"
          alt="Wedding hero"
          fill
          loading="eager"
          sizes="(max-width: 767px) 100vw"
          className="hidden object-cover md:block"
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/20 to-black/55" />
      </motion.div>

      {/* Overlay Text */}
      <div className="relative z-10 flex min-h-dvh flex-col">
        {/* Caption */}
        <div className="px-6 pt-[max(2rem)]">
          <motion.h1
            initial={{ opacity: 0, y: 24, letterSpacing: "0.06em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0em" }}
            transition={{ duration: 2, ease: [0.3, 1, 0.3, 1] }}
            className="text-center font-script text-5xl md:text-7xl text-white"
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
            className="mt-3 text-center text-xl md:text-base tracking-[0.25em] text-white/95"
            style={{
              textShadow: "0 1px 6px rgba(0,0,0,.4)",
            }}
          >
            HOÀNG LONG
            <br className="md:hidden" />
            <span className="hidden md:inline"> &nbsp;•&nbsp; </span>
            NGỌC YẾN
          </motion.p>
        </div>
      </div>
    </section>
  );
}
