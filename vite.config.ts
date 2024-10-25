import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // server: {
    //     proxy: {
    //       '/train/api': {
    //     target: 'https://services.district12.xyz',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/train\/api/, '/train/api'),
    //       },
    //     },
    //   },
});
