import Image, { type ImageProps } from "next/image";

export function OptimizedImage({
  alt,
  quality = 75,
  sizes = "(max-width: 600px) 100vw, 50vw",
  ...props
}: ImageProps) {
  return <Image alt={alt} quality={quality} sizes={sizes} {...props} />;
}
