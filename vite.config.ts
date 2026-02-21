import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";

const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

export default defineConfig({
  plugins: [
    react(),
    {
      name: "html-transform",
      transformIndexHtml(html) {
        return html.replace(
          /%VITE_GOOGLE_TAG_ID%/g,
          process.env.VITE_GOOGLE_TAG_ID || "",
        );
      },
    },
  ],
  base: "/",
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
});
