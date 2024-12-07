import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.jpg', '**/*.png'], // Ensure Vite processes these assets
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
