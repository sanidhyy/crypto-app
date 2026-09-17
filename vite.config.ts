import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Keep the RapidAPI key out of the client bundle until Netlify Functions land.
  define: {
    "process.env.REACT_APP_RAPID_API_KEY": "undefined",
  },
});
