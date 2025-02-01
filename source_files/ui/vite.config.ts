import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	base: '',
	build: {
		reportCompressedSize: false,
		outDir: '../../client_packages/package2/ui',
		emptyOutDir: true,
		minify: 'esbuild',
		chunkSizeWarningLimit: 5000
	},
	plugins: [react()],
	server: {
		open: true,
		port: 3000
	},
	resolve: {
		alias: {}
	}
});
