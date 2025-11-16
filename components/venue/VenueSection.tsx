'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useMotionPresets } from '@/hooks/useMotionPresets';
import { cn } from '@/lib/utils';

function CrestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 140"
      role="presentation"
      aria-hidden="true"
      className={cn('size-20 text-neutral-500 md:size-22', className)}
    >
      <circle
        cx="70"
        cy="70"
        r="58"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M42 92c-9-8-14-19-14-32 0-15 9-28 23-32"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M98 92c9-8 14-19 14-32 0-15-9-28-23-32"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M46 46c6 16 14 24 24 28"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M94 46c-6 16-14 24-24 28"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M70 50c8-10 20-10 28 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M70 50c-8-10-20-10-28 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />
      <circle
        cx="70"
        cy="74"
        r="18"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.4"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="var(--font-heading, serif)"
        fontSize="22"
        letterSpacing="6"
        fill="currentColor"
        opacity="0.55"
      >
        L&Y
      </text>
    </svg>
  );
}

export default function VenueSection() {
  const { container, fadeIn, viewport } = useMotionPresets();

  const containerVariants = container({ offset: 32, duration: 0.7, staggerChildren: 0.16 });
  const crestVariants = fadeIn({ offset: 18, duration: 0.7 });
  const itemVariants = fadeIn({ offset: 24, duration: 0.65 });

  return (
    <motion.section
      id="venue"
      data-scroll-section="true"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="bg-linear-to-b from-rose-50/70 via-white to-rose-50/60 py-12 md:py-10 snap-start "
    >
      <div className="mx-auto flex w-full flex-col items-center gap-10 md:gap-12 px-6 md:px-10 max-w-4xl">
        <motion.article
          variants={containerVariants}
          className="relative flex w-full max-w-xl flex-col items-center overflow-hidden rounded-[2.75rem] border border-neutral-100 bg-white/90 px-6 py-14 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:max-w-2xl md:px-14 md:py-16"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-8 h-px w-36 -translate-x-1/2 bg-linear-to-r from-transparent via-neutral-200 to-transparent md:top-10 md:w-48"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-8 left-1/2 h-px w-36 -translate-x-1/2 bg-linear-to-r from-transparent via-neutral-200 to-transparent md:bottom-10 md:w-48"
          />

          <motion.div variants={crestVariants} className="flex flex-col items-center">
            <CrestIcon />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-[0.7rem] uppercase tracking-[0.45em] text-neutral-400 md:mt-10 md:text-xs"
          >
            {/* Được tổ chức tại – Hosted at */}
            Được tổ chức tại
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="mt-4 font-script text-3xl text-neutral-700 md:mt-5 md:text-4xl"
          >
            {/* Lo Ren Street */}
            Đường Lò Rèn
          </motion.h2>
          <motion.h2
            variants={itemVariants}
            className="font-script text-3xl text-neutral-700 md:mt-5 md:text-4xl"
          >
            {/* Minh Thanh Commune */}
            Xã Minh Thạnh
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-2 text-base text-neutral-600 md:text-lg">
            TP. Hồ Chí Minh
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-5 flex flex-col items-center gap-3 md:mt-12"
          >
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-neutral-400 md:text-xs">
              {/* Vào lúc • At */}
              Vào lúc
            </p>
            <p className="font-heading text-4xl font-semibold text-neutral-800 md:text-5xl">
              11:00
            </p>
            <div className="mt-5 rounded-full border border-neutral-200/80 bg-neutral-50/70 px-6 py-3 text-[0.7rem] uppercase tracking-[0.35em] text-neutral-600 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:text-sm">
              <span className="font-semibold text-neutral-700">Thứ Bảy</span>
              <span className="mx-3 text-neutral-300">|</span>
              <span>06.12.2025</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-5 md:mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-neutral-200 bg-white/80 px-6 py-3 text-xs font-medium uppercase tracking-[0.32em] text-neutral-700 transition-colors hover:bg-neutral-100/80 md:px-10 md:py-4 md:text-sm"
            >
              <Link
                href="https://www.google.com/maps?q=11.418147087097168,106.5288314819336&z=14&t=m&mapclient=embed"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="size-5" />
                {/* Chỉ đường – Directions */}
                Chỉ đường – Tư gia
              </Link>
            </Button>
          </motion.div>
        </motion.article>
      </div>
    </motion.section>
  );
}
