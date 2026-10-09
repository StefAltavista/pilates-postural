import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function CategoryHeaderSection({ name }: { name: string }) {
  return (
    <Box
      component="header"
      sx={{ mb: 5, borderBottom: 1, borderColor: "divider", pb: 3 }}
    >
      <Link href="/news" className="text-sm font-medium underline">
        Novita
      </Link>
      <Typography component="h1" variant="primaryTitle" sx={{ mt: 2 }}>
        {name}
      </Typography>
    </Box>
  );
}
