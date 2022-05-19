import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'http://localhost:8080',
    browserName: 'chromium',
    headless: true,
  },
};
export default config;