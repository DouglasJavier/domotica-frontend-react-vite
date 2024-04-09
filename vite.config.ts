import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  envDir: './', // Esto le dice a Vite que busque archivos .env en la raíz del proyecto
  define: {
    'import.meta.env': {
      VITE_BASE_URL: process.env.VITE_BASE_URL,
      VITE_SITE_NAME: process.env.VITE_SITE_NAME,
      VITE_APP_ENV: process.env.VITE_APP_ENV
    }
  }
});
// https://vitejs.dev/config/
/* export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 8080,
    },
  });
};
 */