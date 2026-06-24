import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { AppButton } from "@/components/common/AppButton";
import { AppContainer } from "@/components/common/AppContainer";
import { logoutAction } from "@/lib/auth/actions";

export function AdminHeader() {
  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <AppContainer maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", minHeight: 64 }}>
        <Stack component="nav" direction="row" spacing={{ xs: 1.5, sm: 3 }} sx={{ typography: "subtitle2" }}>
          <Link href="/admin/posts">Posts</Link>
          <Link href="/admin/categories">Categories</Link>
          <Link href="/" target="_blank">
            View site
          </Link>
        </Stack>
        <form action={logoutAction}>
          <AppButton type="submit" variant="text" color="inherit">
            Logout
          </AppButton>
        </form>
        </Toolbar>
      </AppContainer>
    </AppBar>
  );
}
