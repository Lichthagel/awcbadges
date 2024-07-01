import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { defineConfig, passthroughImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    svelte(),
  ],
  site: "https://badges.lichthagel.de",
  image: {
    domains: ["i.postimg.cc", "awc.moe"],
    service: passthroughImageService(),
  },
});
