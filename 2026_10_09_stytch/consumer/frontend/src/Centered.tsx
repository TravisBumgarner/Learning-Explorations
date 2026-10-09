import { Box } from "@mui/material";
import type { ReactNode } from "react";

const Centered = ({ children }: { children: ReactNode }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center", height: "100vh" }}>
    {children}
  </Box>
);

export default Centered;
