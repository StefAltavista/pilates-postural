"use client";

import Link from "next/link";
import { type CSSProperties, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { PostModalImage } from "@/components/public/posts/PostModalImage";

export type DotCarouselImage = {
  id: string;
  title: string;
  mediumUrl: string;
  largeUrl?: string;
  width: number;
  height: number;
};

type ImageDotCarouselProps = {
  images: DotCarouselImage[];
  href?: string;
  showActiveTitle?: boolean;
};

export function ImageDotCarousel({ images, href, showActiveTitle = false }: ImageDotCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function showSlide(index: number) {
    if (index < 0 || index >= images.length) return;
    const slide = trackRef.current?.children.item(index);
    if (!(slide instanceof HTMLElement)) return;
    setActiveIndex(index);
    slide.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }

  if (!images.length) return null;

  const firstImage = images[0];
  const activeImage = images[activeIndex] ?? firstImage;
  const firstImageAspectRatio = firstImage.width && firstImage.height ? firstImage.width / firstImage.height : 16 / 9;
  const carouselAspectRatio = firstImage.width && firstImage.height ? `${firstImage.width} / ${firstImage.height}` : "16 / 9";

  function getContainedImageStyle(image: DotCarouselImage): CSSProperties {
    const imageAspectRatio = image.width && image.height ? image.width / image.height : firstImageAspectRatio;
    const fitByWidth = imageAspectRatio >= firstImageAspectRatio;

    return {
      display: "block",
      width: fitByWidth ? "100%" : "auto",
      height: fitByWidth ? "auto" : "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      objectPosition: "center",
    };
  }

  return (
    <Box sx={{ px: { lg: 3 } }}>
      {showActiveTitle ? (
        <Typography
          component="p"
          color="text.secondary"
          variant="caption"
          sx={{ mb: 1, textAlign: "center" }}
        >
          {activeImage.title}
        </Typography>
      ) : null}

      <Box
        ref={trackRef}
        aria-label="Post images"
        onScroll={(event) => {
          const track = event.currentTarget;
          if (track.clientWidth) {
            const index = Math.round(track.scrollLeft / track.clientWidth);
            setActiveIndex(Math.max(0, Math.min(images.length - 1, index)));
          }
        }}
        sx={{
          display: "flex",
          alignItems: "stretch",
          aspectRatio: carouselAspectRatio,
          overflowX: "auto",
          overflowY: "hidden",
          scrollBehavior: "smooth",
          scrollSnapType: "x mandatory",
          overscrollBehaviorInline: "contain",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {images.map((image, index) => (
          <Box
            key={image.id}
            sx={{
              display: "grid",
              flex: "0 0 100%",
              height: "100%",
              minHeight: 0,
              minWidth: 0,
              overflow: "hidden",
              placeItems: "center",
              position: "relative",
              scrollSnapAlign: "start",
            }}
          >
            {href ? (
              <Box
                component={Link}
                href={href}
                aria-label={`Open post from image ${index + 1} of ${images.length}: ${image.title}`}
                sx={{
                  display: "grid",
                  height: "100%",
                  lineHeight: 0,
                  maxHeight: "100%",
                  minHeight: 0,
                  overflow: "hidden",
                  placeItems: "center",
                  width: "100%",
                }}
              >
                <OptimizedImage
                  src={image.mediumUrl}
                  alt={image.title}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 1199px) 100vw, 70vw"
                  style={getContainedImageStyle(image)}
                />
              </Box>
            ) : image.largeUrl ? (
              <PostModalImage
                image={{
                  id: image.id,
                  title: image.title,
                  mediumUrl: image.mediumUrl,
                  largeUrl: image.largeUrl,
                  width: image.width,
                  height: image.height,
                }}
                fitContainer
                frameAspectRatio={firstImageAspectRatio}
              />
            ) : null}
          </Box>
        ))}
      </Box>

      {images.length > 1 ? (
        <Box aria-label={`Image ${activeIndex + 1} of ${images.length}`} sx={{ display: "flex", justifyContent: "center", gap: 1, pt: 1.25 }}>
          {images.map((image, index) => (
            <Box
              component="button"
              type="button"
              key={image.id}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => showSlide(index)}
              sx={{
                width: 8,
                height: 8,
                border: 0,
                borderRadius: "50%",
                bgcolor: index === activeIndex ? "text.primary" : "action.disabled",
                cursor: "pointer",
                p: 0,
              }}
            />
          ))}
        </Box>
      ) : null}
    </Box>
  );
}
