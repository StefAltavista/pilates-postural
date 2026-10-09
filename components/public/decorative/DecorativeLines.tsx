import type { SVGProps } from "react";

export type DecorativeLineProps = Pick<
  SVGProps<SVGSVGElement>,
  "className" | "color" | "opacity" | "width" | "height"
>;

function LineCanvas({
  className,
  color = "currentColor",
  opacity = 0.12,
  width = "100%",
  height = "100%",
  children,
}: DecorativeLineProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 800 600"
      fill="none"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      opacity={opacity}
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", pointerEvents: "none" }}
    >
      {children}
    </svg>
  );
}

export function SweepingArcs(props: DecorativeLineProps) {
  return (
    <LineCanvas {...props}>
      <path d="M-100 560C60 100 410-100 900 120" />
      <path d="M-80 620C100 170 450-40 900 180" />
      <path d="M-40 680C140 240 490 20 920 240" />
    </LineCanvas>
  );
}

export function FlowingContour(props: DecorativeLineProps) {
  return (
    <LineCanvas {...props}>
      <path d="M-40 420C150 560 120 100 330 170S550 520 840 90" />
      <path d="M-50 450C180 600 140 140 340 205S580 550 850 130" />
    </LineCanvas>
  );
}

export function CornerCurve(props: DecorativeLineProps) {
  return (
    <LineCanvas {...props}>
      <path d="M250 650C220 350 410 140 850 170" />
      <path d="M300 650C270 390 460 190 850 215" />
      <path d="M350 650C325 440 520 245 850 260" />
    </LineCanvas>
  );
}

export function LooseLoop(props: DecorativeLineProps) {
  return (
    <LineCanvas {...props}>
      <path d="M-40 470C140 450 650 50 680 220S340 600 240 380 510 30 840 130" />
    </LineCanvas>
  );
}
