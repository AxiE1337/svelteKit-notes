/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		screens: {
			md: { max: '768px' }
		}
	},
	darkMode: 'class',
	plugins: [require('daisyui')]
};
