import Button, { type ButtonProps } from "@mui/material/Button";

export function AppButton({ variant = "contained", ...props }: ButtonProps) {
  return <Button variant={variant} {...props} />;
}
