/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5rem' }], // 12px
      sm: ['0.875rem', { lineHeight: '1.5rem' }], // 14px
      base: ['0.9325rem', { lineHeight: '1.5rem' }], // 15px
      lg: ['1.25rem', { lineHeight: '1.5rem' }], // 20px
      xl: ['1.5rem', { lineHeight: '1.2rem' }], // 24px
      '2xl': ['2rem', { lineHeight: '1.2rem' }], // 32px
      '3xl': ['2.5rem', { lineHeight: '1.2rem' }], // 40px
      '4xl': ['3rem', { lineHeight: '1' }], // 48px
      '5xl': ['4rem', { lineHeight: '1' }], // 64px
    },
    fontFamily: {
      joker: ['Jokerman'],
      display: ['SF Pro Display Semibold', 'Helvetica Neue', ...fontFamily.sans],
      primary: ['SF Pro Display', 'Helvetica Neue', ...fontFamily.sans],
      mono: ['var(--font-space_mono)', ...fontFamily.mono],
      code: ['var(--font-sourcecode400)', ...fontFamily.mono],
    },
    extend: {
      backgroundColor: ['before', 'after'],
      colors: {
        lightbrown: '#B3B3B3',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        badge: 'rgba(252, 250, 250, 0.61)',
        link: 'rgba(255, 255, 255, 0.71)',
        address: '#F1F4FF',
        'address-text': '#8695AB',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        main: "url('/bg-beaddao.jpg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
