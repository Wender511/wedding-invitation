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

  const baseTransition = useMemo(
    () => ({
      duration: prefersReducedMotion ? 0 : 0.65,
      ease: DEFAULT_EASE,
    }),
    [prefersReducedMotion]
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
            duration: prefersReducedMotion
              ? 0
              : options.duration ?? baseTransition.duration,
            delay: prefersReducedMotion ? 0 : options.delay ?? 0,
          },
        },
      };
    },
    [baseTransition, prefersReducedMotion]
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
          duration: prefersReducedMotion
            ? 0
            : options.duration ?? baseTransition.duration,
          delay: prefersReducedMotion ? 0 : options.delay ?? 0,
        },
      },
    }),
    [baseTransition, prefersReducedMotion]
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
          duration: prefersReducedMotion
            ? 0
            : options.duration ?? (baseTransition.duration ?? 0.65) + 0.1,
          delay: prefersReducedMotion ? 0 : options.delay ?? 0,
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
    slideFade: createSlideFade,
    scaleIn: createScaleIn,
    spinIn: createSpinIn,
    container: createContainer,
  };
}
