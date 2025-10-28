/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}'
  ],
  presets: [require('@relume_io/relume-tailwind')],
  theme: {
    extend: {
      screens: {
        'xxs': '320px',  // Extra small phones
        'xs': '475px',   // Small phones
      },
      colors: {
        // Custom named colors
        'como': '#4A7C59',           // Main/Primary Green
        'gum-leaf': '#4A7C59',       // Changed to main green
        'ecru-white': '#F5F1E8',     // Background/Menu Bar
        'sandy-brown': '#F4A261',    // Accent
        'roman-coffee': '#824C4E',   // Dark accent
        
        // Professional color system - Override Relume semantic colors
        'background-primary': '#F5F1E8',      // Main background (Ecru White)
        'background-secondary': '#4A7C59',    // Changed to main green
        'background-alternative': '#FFFFFF',   // White for contrast
        
        'border-primary': '#4A7C59',          // Main borders (Como Green)
        'border-secondary': '#4A7C59',        // Changed to main green
        
        'text-primary': '#2C3E2F',            // Dark green for main text (darker como)
        'text-secondary': '#4A7C59',          // Como green for secondary text
        'text-alternative': '#6B8E73',        // Lighter green for muted text
        
        // Button and interaction colors
        'black': '#4A7C59',                   // Primary action color
        'neutral-light': '#D4E5D9',           // Light neutral
      },
      fontFamily: {
        'heading': ['"Gilda Display"', 'serif'],
        'body': ['Lora', 'serif'],
        // Set as defaults
        'sans': ['"Gilda Display"', 'serif'],
        'serif': ['Lora', 'serif'],
      },
      keyframes: {
        'loop-vertically': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'loop-vertically': 'loop-vertically 25s linear infinite',
        'shimmer': 'shimmer 2s infinite',
      },
    },
  },
}
