import react from '@vitejs/plugin-react';
import { defineConfig, UserConfig } from 'vite';
import type { InlineConfig } from 'vitest';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

const vitestConfig: VitestConfigExport = {
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
};

export default defineConfig(vitestConfig);