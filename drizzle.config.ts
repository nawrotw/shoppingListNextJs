import { defineConfig } from 'drizzle-kit';

// https://orm.drizzle.team/kit-docs/conf
export default defineConfig({
  dialect: "postgresql",
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true
});
