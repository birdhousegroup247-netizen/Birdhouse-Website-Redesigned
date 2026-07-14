/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // Landing-page tokens (Part A)
        brand: {
          green: '#0F9D58',
          greenLight: '#E7F5EE',
          greenDark: '#0B7A44',
        },
        // Work / Services tokens (Part B) — same primary green as brand.green
        emerald: {
          50: '#ecfdf3',
          100: '#d1fadf',
          200: '#a6f4c5',
          300: '#6ce9a6',
          400: '#32d583',
          500: '#0F9D58', // Primary Accent
          600: '#0b8248',
          700: '#0a6c3e',
          800: '#095733',
          900: '#08472b',
        },
        // Unified surface scale: named shades (Part A) + numeric zinc scale (Part B).
        // Keys don't collide, so both halves keep working. 400/500/600/700 were
        // referenced by Part B but never defined — now filled in (zinc) so those
        // text/border classes render as originally intended.
        surface: {
          primary: '#FFFFFF',
          secondary: '#F7F9F8',
          tertiary: '#F0F2F1',
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#5F6368',
          tertiary: '#8C9096',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        'desktop': '1440px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 12px 48px 0 rgba(0, 0, 0, 0.08)',
        // `soft` matches Part B's value (its device mockups depend on this depth)
        'soft': '0 20px 40px -15px rgba(0,0,0,0.05)',
        'soft-hover': '0 12px 32px 0 rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
