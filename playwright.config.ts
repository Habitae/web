import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  use: {
    baseURL: 'http://127.0.0.1:4174',
    viewport: { width: 390, height: 844 },
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {},
  },
  webServer: {
    command: process.env.HABITAE_TEST_EDGE === 'true'
      ? 'pnpm build && pnpm edge:dev --port 4174'
      : 'pnpm build && pnpm preview --host 127.0.0.1 --port 4174',
    url: 'http://127.0.0.1:4174',
    env: { VITE_GTM_ID: 'GTM-TEST123', VITE_WAITLIST_ENDPOINT: 'https://waitlist.example/waitlist' },
    reuseExistingServer: false,
  },
});
