const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        t: '0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        blue: '0px 20px 20px -15px rgba(37,99,235,0.81)',
        'blue-md': '0px 20px 40px -15px rgba(37,99,235,0.81)',
        none: 'none'
      },
      colors: {
        transparent: 'transparent',
        black: {
          '500': '#4F5665',
          '600': '#0B132A'
        },
        blue: {
          '100': '#EFF6FF',
          '500': '#3491b4',
          '600': '#67aac3'
        },
        green: {
          '500': '#2FAB73',
          '600': '#04924e'
        },
        white: {
          '300': '#F8F8F8',
          '500': '#fff'
        },
        gray: {
          '100': '#EEEFF2',
          '400': '#AFB5C0',
          '500': '#DDDDDD'
        },
        red: {
          '500': '#ff5757',
          '600': '#e73333'
        },
        sky: {
          '400': '#9bc7d7',
          blue: {
            '500': '#67aac3'
          }
        },
        custom: {
          scrollLabel: '#daf8fd',
          what : '#01BCB4',
          the : '#C0E8ED',
          hell : '#abccdd',
          is : '#FFAC3E',
        },
        ice: {
          blue: {
            '100': '#daf8fd'
          }
        },
        // Define colors directly instead of using CSS variables
        background: '#ffffff', // Light mode background
        foreground: '#0B132A', // Light mode foreground
        card: {
          DEFAULT: '#ffffff', // Light mode card
          foreground: '#0B132A' // Light mode card foreground
        },
        popover: {
          DEFAULT: '#ffffff', // Light mode popover
          foreground: '#0B132A' // Light mode popover foreground
        },
        primary: {
          DEFAULT: '#0B132A', // Light mode primary
          foreground: '#ffffff' // Light mode primary foreground
        },
        secondary: {
          DEFAULT: '#EEEFF2', // Light mode secondary
          foreground: '#0B132A' // Light mode secondary foreground
        },
        muted: {
          DEFAULT: '#EEEFF2', // Light mode muted
          foreground: '#4F5665' // Light mode muted foreground
        },
        accent: {
          DEFAULT: '#EEEFF2', // Light mode accent
          foreground: '#0B132A' // Light mode accent foreground
        },
        destructive: {
          DEFAULT: '#ff5757', // Light mode destructive
          foreground: '#ffffff' // Light mode destructive foreground
        },
        border: '#EEEFF2', // Light mode border
        input: '#hsl(240 3.7% 15.9%)', // Light mode input
        ring: '#0B132A', // Light mode ring
        chart: {
          '1': '#ff5757', // Light mode chart 1
          '2': '#2FAB73', // Light mode chart 2
          '3': '#3491b4', // Light mode chart 3
          '4': '#9bc7d7', // Light mode chart 4
          '5': '#67aac3' // Light mode chart 5
        },
      },
      borderRadius: {
        lg: '0.5rem', // Directly define the radius
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)'
      }
    }
  },
  variants: {
    extend: {
      boxShadow: ["active", "hover"],
    },
  },
  darkMode: ["class", "class"],
  plugins: [heroui(), require("tailwindcss-animate")],
};