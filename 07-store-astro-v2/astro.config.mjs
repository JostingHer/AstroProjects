import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import db from "@astrojs/db";

import auth from "auth-astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), db(), auth(), react()],
  adapter: netlify(),
});