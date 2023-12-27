import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    svelte(),
    icon(),
  ],
  site: "https://badges.lichthagel.de",
});
