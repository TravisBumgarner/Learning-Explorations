import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider, Typography, createTheme } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StytchProvider, createStytchClient } from "@stytch/react";

const stytch = createStytchClient(import.meta.env.VITE_STYTCH_PUBLIC_KEY);
const theme = createTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Typography variant="h1"  >Trav's Page</Typography>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StytchProvider stytch={stytch}>
        <App />
      </StytchProvider>
    </ThemeProvider>
  </StrictMode>,
);
