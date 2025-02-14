/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		colors: {
		  dawn: '#f8f3f3',
		  dusk: '#222',
		  zenith: '#f0e6e6',
		  sunrise: '#ffa69e',
		  night: '#0e0c0e',
		},
		spacing: {
		  24: '6rem',
		  32: '8rem',
		  40: '10rem',
		  48: '12rem',
		  64: '16rem',
		  88: '22rem',
		  96: '24rem',
		},
		maxWidth: {
		  1440: '1440px',
		  496: '496px',
		  536: '536px',
		  736: '736px',
		},
		minHeight: {
		  inherit: 'inherit',
		},
		scale: {
		  '11/10x': '1.1',
		},
		transitionProperty: {
		  'shift-y': 'transform',
		},
		gradientColorStops: theme => ({
		  dusk: '#2d2d2d',
		  transparent: 'transparent',
		  zenith: '#f0e6e6',
		  night: '#0e0c0e',
		}),
	  },
	},
	plugins: [
	  require('@tailwindcss/typography'),
	  require('@tailwindcss/forms'), 
	  require('@tailwindcss/aspect-ratio'), 
	],
  }
  