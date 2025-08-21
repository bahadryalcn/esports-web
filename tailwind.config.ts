/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Gaming theme colors using CSS variables
        gaming: {
          darker: '#0a0a0b',
          dark: '#151419',
          primary: 'var(--primary)',
          secondary: 'var(--destructive)', 
          accent: 'var(--accent)',
          muted: 'var(--muted)',
          card: 'var(--card)',
          border: 'var(--border)',
        },
        neon: {
          primary: 'var(--primary)',
          destructive: 'var(--destructive)',
          accent: 'var(--accent)',
          muted: 'var(--muted)',
          warning: 'var(--destructive)',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 5px currentColor" },
          "50%": { boxShadow: "0 0 20px currentColor, 0 0 30px currentColor" },
        },
        "neon-pulse": {
          "0%, 100%": { textShadow: "0 0 5px currentColor" },
          "50%": { textShadow: "0 0 20px currentColor, 0 0 30px currentColor" },
        },
        "slide-up-fade": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(60px) scale(0.95)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0) scale(1)" 
          },
        },
        "slide-down-fade": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(-60px) scale(0.95)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0) scale(1)" 
          },
        },
        "slide-left-fade": {
          "0%": { 
            opacity: "0", 
            transform: "translateX(-60px) scale(0.95)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateX(0) scale(1)" 
          },
        },
        "slide-right-fade": {
          "0%": { 
            opacity: "0", 
            transform: "translateX(60px) scale(0.95)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateX(0) scale(1)" 
          },
        },
        "zoom-in": {
          "0%": { 
            opacity: "0", 
            transform: "scale(0.8)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "scale(1)" 
          },
        },
        "zoom-out": {
          "0%": { 
            opacity: "0", 
            transform: "scale(1.2)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "scale(1)" 
          },
        },
        "rotate-in": {
          "0%": { 
            opacity: "0", 
            transform: "rotate(-10deg) scale(0.9)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "rotate(0deg) scale(1)" 
          },
        },
        "parallax-slow": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50px)" },
        },
        "parallax-fast": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100px)" },
        },
        "text-glow": {
          "0%, 100%": { 
            textShadow: "0 0 20px var(--primary), 0 0 30px var(--primary), 0 0 40px var(--primary)" 
          },
          "50%": { 
            textShadow: "0 0 30px var(--primary), 0 0 50px var(--primary), 0 0 70px var(--primary)" 
          },
        },
        "bg-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite alternate",
        "slide-up-fade": "slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-left-fade": "slide-left-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-right-fade": "slide-right-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "zoom-in": "zoom-in 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "zoom-out": "zoom-out 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "rotate-in": "rotate-in 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "parallax-slow": "parallax-slow 20s linear infinite",
        "parallax-fast": "parallax-fast 15s linear infinite",
        "text-glow": "text-glow 3s ease-in-out infinite",
        "bg-shift": "bg-shift 8s ease-in-out infinite",
      },
      fontFamily: {
        'gaming': ['Orbitron', 'monospace'],
        'heading': ['Rajdhani', 'sans-serif'],
        'display': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}