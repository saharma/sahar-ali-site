// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://saharali.com',
  adapter: vercel(),
  // The content portfolio is canonical at content.saharali.com, so it stays out
  // of the saharali.com sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes("/content") })],
  env: {
    schema: {
      SUPABASE_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      SUPABASE_SERVICE_ROLE_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
});
