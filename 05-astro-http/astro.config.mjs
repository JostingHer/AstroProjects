import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';

// import node from "@astrojs/node";
import cloudflare from "@astrojs/cloudflare";


import db from "@astrojs/db";


// https://astro.build/config
export default defineConfig( {
  site: 'https://example.com',
  integrations: [ vue(), mdx(), sitemap(), db()],
  output: "hybrid",
  adapter: cloudflare({ imageService: "cloudflare" }),
  image: { service: passthroughImageService() },
} );