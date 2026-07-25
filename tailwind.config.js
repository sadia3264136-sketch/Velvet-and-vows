/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'canvas-dark': '#0b0e11',
        'surface-card-dark': '#1e2329',
        'surface-elevated-dark': '#2b3139',
        primary: '#FCD535',
        'primary-active': '#f0b90b',
        'canvas-light': '#ffffff',
        'surface-soft-light': '#fafafa',
        'hairline-on-light': '#eaecef',
        'hairline-on-dark': '#2b3139',
        ink: '#181a20',
        body: '#eaecef',
        muted: '#707a8a',
        'on-primary': '#181a20',
      },
      fontFamily: {
        display: ['Inter', 'BinanceNova', 'sans-serif'],
        body: ['Inter', 'BinanceNova', 'sans-serif'],
        mono: ['JetBrains Mono', 'BinancePlex', 'monospace'],
      },
      fontSize: {
        hero: ['64px', { lineHeight: '1.1', fontWeight: '700' }],
      },
      borderRadius: {
        md: '6px',
        lg: '8px',
        xl: '12px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
