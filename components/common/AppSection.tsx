import Box, { type BoxProps } from "@mui/material/Box";

export function AppSection({ children, sx, ...props }: BoxProps) {
  const sectionSx = sx
    ? [{ py: { xs: 7, sm: 8, md: 10, lg: 14 } }, ...(Array.isArray(sx) ? sx : [sx])]
    : { py: { xs: 7, sm: 8, md: 10, lg: 14 } };

  return (
    <Box component="section" sx={sectionSx} {...props}>
      {children}
    </Box>
  );
}
