import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import rome from "astro-rome";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
});
