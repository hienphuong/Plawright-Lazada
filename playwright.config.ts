import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    expect:{
        timeout: 5000,
    },
    retries: 0,
    reporter: [['html']],
    use: {
        headless: false,
        ignoreHTTPSErrors: true,
        video: 'on-first-retry',
        screenshot: 'only-on-failure',
        actionTimeout: 10000,
    },
});