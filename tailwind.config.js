import { join } from 'path';
import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}',
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(
			require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}',
		),
	],
	theme: {
		extend: {},
	},
	plugins: [
		forms,
		skeleton({
			themes: {
				preset: [
					// Enable 'enhancements' per each registered theme:
					{ name: 'skeleton', enhancements: true },
					{ name: 'wintry', enhancements: false },
					{ name: 'rocket', enhancements: false },
					{ name: 'vintage', enhancements: false },
					{ name: 'sahara', enhancements: false },
					{ name: 'hamlindigo', enhancements: false },
					{ name: 'gold-nouveau', enhancements: true },
				],
			},
		}),
	],
};
