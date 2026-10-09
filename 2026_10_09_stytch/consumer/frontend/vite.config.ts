import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5273,
    strictPort: true,
    // Same-origin /api so the Django session cookie just works.
    proxy: { "/api": "http://localhost:8200" },
  },
});
