import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, passthroughImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  site: "https://badges.lichthagel.de",
  image: {
    domains: ["i.postimg.cc", "awc.moe"],
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
