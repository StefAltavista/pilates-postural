import Box from "@mui/material/Box";
import { CookieBanner } from "@/components/cookie/CookieBanner";
import { PublicFooter } from "@/components/layout/public/PublicFooter";
import { PublicHeader } from "@/components/layout/public/PublicHeader";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <PublicHeader />
      <Box component="main" id="main-content" sx={{ flex: 1 }}>
        {children}
      </Box>
      <PublicFooter />
      <CookieBanner />
    </Box>
  );
}
