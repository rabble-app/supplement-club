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
				red: '#B42318',
				red2: '#FEE4E2',
				blue: '#00038F',
				blue2: '#DFDFFF',
				blue3: '#00038F',
				blue4: '#007AFF',
				blue5: '#7578FF',
				blue6: '#EFF0FF',
				blue8: '#00038F1A',
				blue9: '#E2E3FF',
				blue10: '#E5E6F4',
				green: '#61D27A',
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
				grey3: '#E3E3E3',
				grey4: '#8E8E93',
				grey5: '#767676',
				grey6: '#757575',
				grey7: '#B3B3B3',
				grey8: '#F6F5F1',
				grey9: '#D1D1D1',
				grey10: '#E6E3CF',
				grey11: '#F4F4F4',
				grey12: '#F6F6F6',
				grey13: '#E3E3E3',
				grey14: '#F9F9F9',
				grey15: '#999999',
				grey16: '#666666',
				grey17: '#9E9E9E',
				grey18: '#DEDEDE',
				grey19: '#EEEEEE',
				grey20: '#E4E4E4',
				grey21: '#F7F7F7',
				grey22: '#E8E8E8',
				grey23: '#B7B7B7',
				grey24: '#FFFFFF',
				grey25: '#9B9B9B'
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
			},
			fontFamily: {
				'inconsolata': ['inconsolata'],
				'figtree': ['figtree'],
				'inter': ['inter'],
				'roboto': ['roboto'],
				'helvetica': ['helvetica'],
				'hagerman': ['hagerman']
			},
			boxShadow: {
				'card': '0px 10px 60px 0px #0000001A',
				'login': '0px 1px 2px 0px #0000000D',
				'3': '0px 4px 16px 0px #00000014',
				'progress': '0px 4px 4px 0px #5B5B5B1A inset'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
