import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { OptimizedImage } from "@/components/common/OptimizedImage";

export function StudioImageHero() {
  return (
    <Box
      component="section"
      aria-label="Pilates Postural Studio"
      sx={{
        alignItems: "center",
        display: "flex",
        height: { xs: "70svh", md: "calc(100svh - 174px)" },
        justifyContent: "center",
        maxHeight: 900,
        minHeight: { xs: 520, md: 620 },
        overflow: "hidden",
        position: "relative",
      }}
    >
      <OptimizedImage
        src="/images/home/home1.jpg"
        alt="La sala attrezzi di Pilates Postural Studio a Rapallo"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        className="saturate-130 brightness-105"
      />

      <Box
        aria-hidden="true"
        sx={{
          background:
            "linear-gradient(180deg, rgba(7, 31, 29, 0.15) 0%, rgba(7, 31, 29, 0.20) 56%, rgba(7, 31, 29, 0.30) 100%)",
          inset: 0,
          position: "absolute",
        }}
      />

      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          px: 3,
          position: "relative",
          width: "100%",
          zIndex: 1,
        }}
      >
        <OptimizedImage
          src="/images/logo_official4.png"
          alt="Pilates Postural Studio"
          width={1733}
          height={1634}
          sizes="(max-width: 600px) 72vw, 500px"
          style={{
            display: "block",
            filter: "brightness(0) invert(1)",
            height: "auto",
            maxWidth: 500,
            width: "min(72vw, 500px)",
          }}
        />
        <Typography
          variant="overline"
          sx={{
            color: "white",
            letterSpacing: "0.12em",
            mt: { xs: 1.5, md: 2 },
            // textShadow: "0 2px 18px rgba(0,0,0,0.42)",
          }}
        >
          di Andrea Maresca
        </Typography>
      </Box>
    </Box>
  );
}
