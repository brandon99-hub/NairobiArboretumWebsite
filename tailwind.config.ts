import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Arboretum custom colors
        arboretum: {
          "forest-green": "hsl(130, 35%, 34%)",
          "leaf-green": "hsl(120, 25%, 65%)",
          "earth-brown": "hsl(34, 61%, 42%)",
          "stone-gray": "hsl(0, 0%, 45%)",
          "off-white": "hsl(60, 10%, 98%)",
        },
        chart: {
          "1": "hsl(130, 35%, 34%)", // forest green
          "2": "hsl(120, 25%, 65%)", // leaf green
          "3": "hsl(34, 61%, 42%)", // earth brown
          "4": "hsl(0, 0%, 45%)", // stone gray
          "5": "hsl(60, 10%, 98%)", // off white
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background, 130 35% 34%))",
          foreground: "hsl(var(--sidebar-foreground, 0 0% 100%))",
          primary: "hsl(var(--sidebar-primary, 120 25% 65%))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground, 0 0% 0%))",
          accent: "hsl(var(--sidebar-accent, 34 61% 42%))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground, 0 0% 100%))",
          border: "hsl(var(--sidebar-border, 120 25% 75%))",
          ring: "hsl(var(--sidebar-ring, 130 35% 34%))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
