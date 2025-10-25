import devtoolsJson from "vite-plugin-devtools-json";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit(), devtoolsJson()],
  server: {
    host: true, // Allow LAN / external access
    allowedHosts: [".trycloudflare.com"], // Allow Cloudflare tunnel hosts
    port: 5173, // Ensure consistent port
    fs: {
      allow: ["."], // 👈 required for Chrome DevTools Workspaces to access source files
    },
  },
  build: {
    sourcemap: true, // 👈 ensures DevTools can trace compiled CSS/JS to .svelte files
  },
});
