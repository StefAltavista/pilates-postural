import Container, { type ContainerProps } from "@mui/material/Container";

export function AppContainer({ maxWidth = "lg", ...props }: ContainerProps) {
  return <Container maxWidth={maxWidth} {...props} />;
}
