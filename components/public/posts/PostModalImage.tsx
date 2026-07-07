"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { OptimizedImage } from "@/components/common/OptimizedImage";

export type PostDisplayImage = {
  id: string;
  title: string;
  mediumUrl: string;
  largeUrl: string;
  width: number;
  height: number;
};

export function PostModalImage({
  image,
  priority = false,
  fitContainer = false,
  frameAspectRatio,
}: {
  image: PostDisplayImage;
  priority?: boolean;
  fitContainer?: boolean;
  frameAspectRatio?: number;
}) {
  const [open, setOpen] = useState(false);
  const imageAspectRatio = image.width && image.height ? image.width / image.height : 1;
  const fitFrameAspectRatio = frameAspectRatio ?? imageAspectRatio;
  const fitByWidth = imageAspectRatio >= fitFrameAspectRatio;
  const containedImageStyle: CSSProperties = fitContainer
    ? {
        display: "block",
        width: fitByWidth ? "100%" : "auto",
        height: fitByWidth ? "auto" : "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        objectPosition: "center",
      }
    : {
        display: "block",
        width: "100%",
        height: "auto",
      };

  return (
    <>
      <Box
        component="button"
        type="button"
        aria-label={`Open image: ${image.title}`}
        onClick={() => setOpen(true)}
        sx={{
          appearance: "none",
          bgcolor: "transparent",
          border: 0,
          cursor: "zoom-in",
          display: fitContainer ? "grid" : "block",
          height: fitContainer ? "100%" : "auto",
          lineHeight: fitContainer ? 0 : undefined,
          m: 0,
          maxHeight: fitContainer ? "100%" : undefined,
          minHeight: fitContainer ? 0 : undefined,
          overflow: fitContainer ? "hidden" : undefined,
          p: 0,
          placeItems: fitContainer ? "center" : undefined,
          width: "100%",
        }}
      >
        <OptimizedImage
          src={image.mediumUrl}
          alt={image.title}
          width={image.width}
          height={image.height}
          sizes="(max-width: 900px) 100vw, 820px"
          priority={priority}
          style={containedImageStyle}
        />
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="lg"
        aria-label="Image preview"
        slotProps={{ paper: { sx: { bgcolor: "common.black", color: "common.white", m: { xs: 1, sm: 3 } } } }}
      >
        <Stack>
          <Box sx={{ position: "relative", display: "grid", minHeight: { xs: "60vh", sm: "75vh" }, placeItems: "center", p: { xs: 1, sm: 2 } }}>
            <OptimizedImage
              src={image.largeUrl}
              alt={image.title}
              width={image.width}
              height={image.height}
              sizes="100vw"
              style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "72vh", objectFit: "contain" }}
            />
            <IconButton aria-label="Close image preview" onClick={() => setOpen(false)} sx={{ position: "absolute", right: 8, top: 8, bgcolor: "rgba(0,0,0,.55)", color: "common.white", "&:hover": { bgcolor: "rgba(0,0,0,.75)" } }}>
              <Typography component="span" aria-hidden="true" sx={{ fontSize: 26, lineHeight: 1 }}>×</Typography>
            </IconButton>
          </Box>
          <Typography sx={{ borderTop: "1px solid rgba(255,255,255,.2)", px: 2.5, py: 2, textAlign: "center" }}>
            {image.title}
          </Typography>
        </Stack>
      </Dialog>
    </>
  );
}
