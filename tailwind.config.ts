import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				blue: '#00038F',
				blue2: '#DFDFFF',
				blue3: '#00038F',
				blue4: '#007AFF',
				yellow: '#FBF89F',
				yello1: '#FFFED8',
				cream: '#F9F7F4',
				cream1: '#FCFCF9',
				black1: '#01024A',
				black2: '#1A1A1A',
				black3: '#0F2E2F',
				black4: '#1E1E1E',
				grey: '#D9D9D9',
				grey1: '#565656',
				grey2: '#CCCCCC',
				grey3: 'E3E3E3',
				grey4: '#8E8E93',
				grey5: '#767676',
				grey6: '#757575',
				grey7: '#B3B3B3',
				grey8: '#F6F5F1',
				grey9: '#D1D1D1',
				grey10: '#E6E3CF',
				grey11: '#F4F4F4',
				grey12: '#F6F6F6',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
