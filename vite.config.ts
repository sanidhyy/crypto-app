import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (env.RAPID_API_KEY && !process.env.RAPID_API_KEY) {
    process.env.RAPID_API_KEY = env.RAPID_API_KEY;
  }

  return {
    plugins: [
      react(),
      netlify({
        edgeFunctions: { enabled: false },
        blobs: { enabled: false },
        database: { enabled: false },
        images: { enabled: false },
      }),
    ],
  };
});
