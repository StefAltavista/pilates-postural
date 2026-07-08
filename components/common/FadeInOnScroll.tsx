"use client";

import { useEffect, useRef, useState } from "react";
import Box, { type BoxProps } from "@mui/material/Box";

type FadeInOnScrollProps = BoxProps & {
  delayMs?: number;
  rootMargin?: string;
  threshold?: number;
};

export function FadeInOnScroll({
  children,
  delayMs = 0,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.18,
  sx,
  ...props
}: FadeInOnScrollProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const fadeSx = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(32px)",
    transition: "opacity 700ms ease, transform 700ms ease",
    transitionDelay: isVisible ? `${delayMs}ms` : "0ms",
    willChange: isVisible ? "auto" : "opacity, transform",
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      transform: "none",
    },
  };

  const composedSx = sx
    ? [fadeSx, ...(Array.isArray(sx) ? sx : [sx])]
    : fadeSx;

  return (
    <Box ref={elementRef} sx={composedSx} {...props}>
      {children}
    </Box>
  );
}
