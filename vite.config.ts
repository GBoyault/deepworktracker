import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["framer-motion"],
          mui: [
            "@emotion/react",
            "@emotion/styled",
            "@mui/material",
            "@mui/x-date-pickers",
          ],
          moment: ["moment"],
          router: ["react-router"],
        },
      },
    },
  },
  plugins: [react()],
});
