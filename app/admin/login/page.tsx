import { redirect } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LoginForm } from "@/components/admin/LoginForm";
import { AppCard } from "@/components/common/AppCard";
import { getAdminSession } from "@/lib/auth/session";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/posts");
  }

  return (
    <Box component="main" sx={{ display: "grid", minHeight: "100vh", placeItems: "center", px: 2 }}>
      <AppCard
        component="section"
        sx={{
          bgcolor: "surface.light",
          color: "text.primary",
          p: { xs: 2.5, sm: 3 },
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>Admin login</Typography>
        <LoginForm />
      </AppCard>
    </Box>
  );
}
