// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://saharali.com',
  adapter: vercel(),
  // Subdomain experiences are canonical on their own hosts, so they stay out
  // of the saharali.com sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes("/content") && !page.includes("/events") })],
  env: {
    schema: {
      SUPABASE_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      SUPABASE_SERVICE_ROLE_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      OPENAI_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
