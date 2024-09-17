/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: [
				'"Inter", sans-serif',
				{
					fontFeatureSettings: '"cv11", "ss01"',
					fontVariationSettings: '"opsz" 32',
				},
			],
		},
		extend: {
			colors: {
				"ds-bg": "#EDF2F7",
				"ds-bg-subtle": "#F7FAFC",
				"ds-primary": "#475DE5",
				"ds-fg": "#1A202C",
				"ds-fg-2": "#2D3748",
				"ds-fg-3": "#4A5568",
				"ds-subtle": "#718096",
				"ds-subtle-2": "#A0AEC0",
				"ds-red-100": "#FEDDE6",
				"ds-red-500": "#922B6C",
				"ds-purple-100": "#EFE2FE",
				"ds-purple-500": "#574195",
				"ds-blue-100": "#C8E7F9",
				"ds-blue-500": "#2C5282",
				"ds-yellow-100": "#FEEBC8",
				"ds-yellow-500": "#91472C",
				"ds-border": "#E2E8F0",
			},
		},
	},
	plugins: [],
};
