import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// base './' keeps every asset path relative, so the same build works locally
// and under https://benamuwo.me/first-notice/ (the Flask blueprint 308-redirects
// /first-notice to /first-notice/ so relative paths resolve).
export default defineConfig({
  plugins: [react()],
  base: './',
  test: { include: ['tests/**/*.test.ts'] },
} as never);
