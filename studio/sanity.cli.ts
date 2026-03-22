/**
 * Sanity CLI Configuration
 * This file configures the Sanity CLI tool with project-specific settings
 * and customizes the Vite bundler configuration.
 * Learn more: https://www.sanity.io/docs/cli
 */

import {defineCliConfig} from 'sanity/cli'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}

const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID',
)
const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  'Missing environment variable: SANITY_STUDIO_DATASET',
)

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || '', // Visit https://www.sanity.io/docs/studio/environment-variables to learn more about using environment variables for local & production.
  deployment: {
    autoUpdates: true,
    appId: 'lzlolu8mjqb0n57u8bfr1ft0',
  },
  server: {
    hostname: 'localhost',
    port: 3333,
  },
  vite: (config) => ({
    ...config,
    server: {
      ...config.server,
      watch: {
        ...(config.server?.watch ?? {}),
        usePolling: true,
      },
    },
  }),
  typegen: {
    path: './src/**/*.{ts,tsx,js,jsx}',
    schema: '../.sanity/schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
})
