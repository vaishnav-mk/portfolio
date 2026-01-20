/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // OpenCode terminal palette
        'oc-bg': '#1a1a1a',
        'oc-bg-alt': '#242424',
        'oc-border': '#333333',
        'oc-text': '#e5e5e5',
        'oc-text-muted': '#8e8b8b',
        'oc-text-dim': '#656363',
        'oc-accent': '#cfcecd',
        'oc-highlight': '#ffffff',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        none: '0',
        DEFAULT: '0',
      },
    },
  },
  plugins: [],
}
