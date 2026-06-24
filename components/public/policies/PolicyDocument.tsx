import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";

export function PolicyDocument({ title, content }: { title: string; content: string }) {
  const blocks = content.trim().split(/\n{2,}/);

  return (
    <AppSection>
      <AppContainer maxWidth="md">
        <Typography component="h1" variant="h3" sx={{ mb: 4 }}>
          {title}
        </Typography>
        <Stack component="article" spacing={3}>
          {blocks.map((block, index) => {
            if (block.startsWith("> ")) {
              return (
                <Alert severity="warning" key={index}>
                  {block.slice(2)}
                </Alert>
              );
            }

            if (block.startsWith("## ")) {
              return (
                <Typography component="h2" variant="h5" key={index}>
                  {block.slice(3)}
                </Typography>
              );
            }

            if (block.split("\n").every((line) => line.startsWith("- "))) {
              return (
                <Box component="ul" key={index} sx={{ m: 0, pl: 3 }}>
                  {block.split("\n").map((line) => (
                    <Typography component="li" key={line} sx={{ mb: 0.75 }}>
                      {line.slice(2)}
                    </Typography>
                  ))}
                </Box>
              );
            }

            return (
              <Typography color="text.secondary" key={index} sx={{ whiteSpace: "pre-line" }}>
                {block}
              </Typography>
            );
          })}
        </Stack>
      </AppContainer>
    </AppSection>
  );
}
