import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { AppButton } from "@/components/common/AppButton";
import { AppContainer } from "@/components/common/AppContainer";
import { logoutAction } from "@/lib/auth/actions";
import { createAdminCsrfToken } from "@/lib/auth/csrf";

export async function AdminHeader() {
  const csrfToken = await createAdminCsrfToken();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "rgba(238, 250, 249, 0.24)",
        color: "surfaceAlt.light",
      }}
    >
      <AppContainer maxWidth="md">
        <Toolbar
          disableGutters
          sx={{
            gap: 2,
            justifyContent: "space-between",
            minHeight: 64,
            py: { xs: 1, sm: 0 },
          }}
        >
          <Stack
            component="nav"
            direction="row"
            spacing={{ xs: 1.5, sm: 3 }}
            sx={{ color: "inherit", typography: "subtitle2" }}
          >
            <Box component={Link} href="/admin/posts" sx={{ color: "inherit", textDecoration: "none" }}>
              Posts
            </Box>
            <Box component={Link} href="/admin/categories" sx={{ color: "inherit", textDecoration: "none" }}>
              Categories
            </Box>
            <Box component={Link} href="/" target="_blank" sx={{ color: "inherit", textDecoration: "none" }}>
              View site
            </Box>
          </Stack>
          <form action={logoutAction}>
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <AppButton type="submit" variant="text" color="inherit">
              Logout
            </AppButton>
          </form>
        </Toolbar>
      </AppContainer>
    </AppBar>
  );
}
