import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	base: '',
	build: {
		reportCompressedSize: false,
		outDir: '../../client_packages/package2/ui',
		emptyOutDir: false,
		minify: false,
		chunkSizeWarningLimit: 5000
	},
	plugins: [react(), svgr({ include: '**/*.svg' })],
	server: {
		open: false,
		port: 3000,
		fs: {
			strict: false
		},
		hmr: {
			path: './'
		}
	},
	resolve: {
		alias: {
			'@shared': resolve(__dirname, '../shared/index.ts')
		}
	}
});
