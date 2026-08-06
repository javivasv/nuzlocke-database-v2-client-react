/// <reference types="vitest" />
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

const projectRoot = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // `npm run test:unit` runs `vitest --root src/`, which would otherwise make
  // Vite look for .env files inside src/ instead of the actual project root.
  envDir: projectRoot,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})