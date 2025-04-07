
import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
const { publicVars } = loadEnv({ prefixes: ['VITE_'] });

export default defineConfig({
  html: {
    template: './index.html',
  },
  plugins: [pluginReact()],
  source: {
    define: publicVars,
    entry: {
      index: './src/index.tsx',
    },
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
  tools: {
    // css module false
  }
});