import { useCallback, useMemo } from "react";
import { useReducedMotion } from "framer-motion";

export const DEFAULT_EASE = [0.33, 1, 0.68, 1] as const;
export const DEFAULT_VIEWPORT = { once: true, amount: 0.35 } as const;

type FadeOptions = {
  offset?: number;
  delay?: number;
  duration?: number;
};

type ContainerOptions = FadeOptions & {
  staggerChildren?: number;
  delayChildren?: number;
  when?: "beforeChildren" | "afterChildren" | undefined;
};

export function useMotionPresets() {
  const prefersReducedMotion = useReducedMotion();

  const baseTransition = useMemo(
    () => ({
      duration: prefersReducedMotion ? 0 : 0.65,
      ease: DEFAULT_EASE,
    }),
    [prefersReducedMotion]
  );

  const createFadeIn = useCallback(
    (options: FadeOptions = {}) => ({
      hidden: {
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : options.offset ?? 24,
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          ...baseTransition,
          duration: prefersReducedMotion
            ? 0
            : options.duration ?? baseTransition.duration,
          delay: prefersReducedMotion ? 0 : options.delay ?? 0,
        },
      },
    }),
    [baseTransition, prefersReducedMotion]
  );

  const createContainer = useCallback(
    (options: ContainerOptions = {}) => ({
      hidden: {
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : options.offset ?? 24,
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          ...baseTransition,
          when: options.when ?? "beforeChildren",
          delayChildren: prefersReducedMotion
            ? 0
            : options.delayChildren ?? 0,
          staggerChildren: prefersReducedMotion
            ? 0
            : options.staggerChildren ?? 0.12,
          duration: prefersReducedMotion
            ? 0
            : options.duration ?? baseTransition.duration,
        },
      },
    }),
    [baseTransition, prefersReducedMotion]
  );

  return {
    prefersReducedMotion,
    baseTransition,
    viewport: DEFAULT_VIEWPORT,
    fadeIn: createFadeIn,
    container: createContainer,
  };
}
