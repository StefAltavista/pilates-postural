import Box from "@mui/material/Box";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AppContainer } from "@/components/common/AppContainer";

export function AdminPage({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AdminHeader />
      <AppContainer component="main" maxWidth="md" sx={{ py: { xs: 3, md: 4 } }}>
        {children}
      </AppContainer>
    </Box>
  );
}
