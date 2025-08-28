import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'iee-blue': 'var(--color-iee-blue)',
        'iee-yellow': 'var(--color-iee-yellow)',
        'iee-footer': 'var(--color-iee-footer)',
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        serif: ['Lora', 'serif'],
        work: ['Work Sans', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
