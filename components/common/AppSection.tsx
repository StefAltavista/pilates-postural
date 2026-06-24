import Box, { type BoxProps } from "@mui/material/Box";

export function AppSection({ children, sx, ...props }: BoxProps) {
  const sectionSx = sx
    ? [{ py: { xs: 5, md: 8 } }, ...(Array.isArray(sx) ? sx : [sx])]
    : { py: { xs: 5, md: 8 } };

  return (
    <Box component="section" sx={sectionSx} {...props}>
      {children}
    </Box>
  );
}
