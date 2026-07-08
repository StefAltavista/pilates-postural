import Box, { type BoxProps } from "@mui/material/Box";

export function AppSection({ children, sx, ...props }: BoxProps) {
  const sectionSx = sx
    ? [{ py: { xs: 5, sm: 6, md: 9, lg: 12 } }, ...(Array.isArray(sx) ? sx : [sx])]
    : { py: { xs: 5, sm: 6, md: 9, lg: 12 } };

  return (
    <Box component="section" sx={sectionSx} {...props}>
      {children}
    </Box>
  );
}
