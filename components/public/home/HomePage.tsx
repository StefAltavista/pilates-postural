import Box from "@mui/material/Box";
import { StudioImageHero } from "./StudioImageHero";
import { Hero } from "./hero";
import { EquipmentSection } from "./EquipmentSection";
import { WelcomeSection } from "./WelcomeSection";
import { MovementSection } from "./MovementSection";
import { GuidedMovementSection } from "./GuidedMovementSection";
import { AboutMeSection } from "./AboutMeSection";
import { StudioContactSection } from "./StudioContactSection";

export function HomePage() {
  return (
    <Box sx={{ color: "text.primary" }}>
      <StudioImageHero />
      <Hero />
      <EquipmentSection />
      <MovementSection />
      <GuidedMovementSection />
      <AboutMeSection />
      <WelcomeSection />

      <StudioContactSection />
    </Box>
  );
}
