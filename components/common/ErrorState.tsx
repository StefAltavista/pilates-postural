import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";

type ErrorStateProps = {
  title?: string;
  description: string;
  action?: React.ReactNode;
};

export function ErrorState({
  title = "Something went wrong",
  description,
  action,
}: ErrorStateProps) {
  return (
    <Alert severity="error" variant="outlined">
      <AlertTitle>{title}</AlertTitle>
      {description}
      {action ? <Box sx={{ mt: 2 }}>{action}</Box> : null}
    </Alert>
  );
}
