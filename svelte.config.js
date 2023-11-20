import { vitePreprocess } from '@sveltejs/kit/vite'; /* 
import adapter from '@sveltejs/adapter-auto'; */
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},

	preprocess: [vitePreprocess({})],

	vitePlugin: {
		inspector: {
			holdMode: true,
		},
	},
};

export default config;
