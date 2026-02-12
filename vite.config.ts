import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const getBase = () => {
  // In GitHub Actions, use the repository name as the base path
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split("/")[1];
    return `/${repoName}/`;
  }
  // Locally, use root path
  return "/";
};

export default defineConfig({
  plugins: [react()],
  base: getBase(),
});
