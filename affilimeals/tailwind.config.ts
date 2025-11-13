import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: '#792D8E' },
      fontFamily: { mont: ['Montserrat','ui-sans-serif','system-ui'] },
      borderRadius: { '2xl':'1rem' }
    }
  },
  plugins: []
} satisfies Config
