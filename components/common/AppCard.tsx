import Card, { type CardProps } from "@mui/material/Card";

export function AppCard({ variant = "outlined", ...props }: CardProps) {
  return <Card variant={variant} {...props} />;
}
