import { useCallback, useMemo } from "react";
import { useReducedMotion } from "framer-motion";

export const DEFAULT_EASE = [0.33, 1, 0.68, 1] as const;
export const DEFAULT_VIEWPORT = { once: true, amount: 0.35 } as const;
const BASE_DURATION = 0.65;
const DEFAULT_STAGGER = 0.12;
const MOTION_SPEED_FACTOR = 0.85;

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

type SlideDirection = "up" | "down" | "left" | "right";

type SlideFadeOptions = FadeOptions & {
  direction?: SlideDirection;
};

type ScaleOptions = FadeOptions & {
  initialScale?: number;
  targetScale?: number;
};

type SpinOptions = ScaleOptions & {
  rotate?: number;
};

export function useMotionPresets() {
  const prefersReducedMotion = useReducedMotion();
  const speedFactor = prefersReducedMotion ? 1 : MOTION_SPEED_FACTOR;

  const resolveDuration = useCallback(
    (duration?: number) =>
      prefersReducedMotion ? 0 : (duration ?? BASE_DURATION) * speedFactor,
    [prefersReducedMotion, speedFactor]
  );

  const resolveDelay = useCallback(
    (delay?: number) =>
      prefersReducedMotion ? 0 : (delay ?? 0) * speedFactor,
    [prefersReducedMotion, speedFactor]
  );

  const resolveStagger = useCallback(
    (stagger?: number) =>
      prefersReducedMotion ? 0 : (stagger ?? DEFAULT_STAGGER) * speedFactor,
    [prefersReducedMotion, speedFactor]
  );

  const baseTransition = useMemo(
    () => ({
      duration: resolveDuration(),
      ease: DEFAULT_EASE,
    }),
    [resolveDuration]
  );

  const createSlideFade = useCallback(
    (options: SlideFadeOptions = {}) => {
      const direction = options.direction ?? "up";
      const offset = options.offset ?? 24;
      const hiddenTransform = (() => {
        if (prefersReducedMotion) {
          return {};
        }

        switch (direction) {
          case "down":
            return { y: -offset };
          case "left":
            return { x: offset };
          case "right":
            return { x: -offset };
          case "up":
          default:
            return { y: offset };
        }
      })();

      return {
        hidden: {
          opacity: prefersReducedMotion ? 1 : 0,
          ...hiddenTransform,
        },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            ...baseTransition,
            duration: resolveDuration(options.duration),
            delay: resolveDelay(options.delay),
          },
        },
      };
    },
    [baseTransition, prefersReducedMotion, resolveDelay, resolveDuration]
  );

  const createFadeIn = useCallback(
    (options: FadeOptions = {}) => createSlideFade(options),
    [createSlideFade]
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
            : resolveDelay(options.delayChildren),
          staggerChildren: resolveStagger(options.staggerChildren),
          duration: resolveDuration(options.duration),
        },
      },
    }),
    [baseTransition, prefersReducedMotion, resolveDelay, resolveDuration, resolveStagger]
  );

  const createScaleIn = useCallback(
    (options: ScaleOptions = {}) => ({
      hidden: {
        opacity: prefersReducedMotion ? 1 : 0,
        scale: prefersReducedMotion ? 1 : options.initialScale ?? 0.9,
      },
      show: {
        opacity: 1,
        scale: prefersReducedMotion ? 1 : options.targetScale ?? 1,
        transition: {
          ...baseTransition,
          duration: resolveDuration(options.duration),
          delay: resolveDelay(options.delay),
        },
      },
    }),
    [baseTransition, prefersReducedMotion, resolveDelay, resolveDuration]
  );

  const createSpinIn = useCallback(
    (options: SpinOptions = {}) => ({
      hidden: {
        opacity: prefersReducedMotion ? 1 : 0,
        rotate: prefersReducedMotion ? 0 : options.rotate ?? -10,
        scale: prefersReducedMotion ? 1 : options.initialScale ?? 0.92,
      },
      show: {
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: {
          ...baseTransition,
          duration: resolveDuration(
            (options.duration ?? BASE_DURATION) + 0.1
          ),
          delay: resolveDelay(options.delay),
        },
      },
    }),
    [baseTransition, prefersReducedMotion, resolveDelay, resolveDuration]
  );

  return {
    prefersReducedMotion,
    baseTransition,
    viewport: DEFAULT_VIEWPORT,
    fadeIn: createFadeIn,
    slideFade: createSlideFade,
    scaleIn: createScaleIn,
    spinIn: createSpinIn,
    container: createContainer,
  };
}
