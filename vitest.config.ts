import { defineConfig, configDefaults } from 'vitest/config'

import react from '@vitejs/plugin-react'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
    exclude: [...configDefaults.exclude, 'legacy/**/*', 'contracts/**/*'],
  },
  plugins: [react()],
  resolve: {
    alias: { '@': './app' },
  },
})
