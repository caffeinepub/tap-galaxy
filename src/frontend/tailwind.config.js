import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                },
                game: {
                    'space-dark': 'oklch(var(--game-space-dark) / <alpha-value>)',
                    'nebula': 'oklch(var(--game-nebula) / <alpha-value>)',
                    'accent': 'oklch(var(--game-accent) / <alpha-value>)',
                    'accent-bright': 'oklch(var(--game-accent-bright) / <alpha-value>)',
                    'text-bright': 'oklch(var(--game-text-bright) / <alpha-value>)',
                    'text-muted': 'oklch(var(--game-text-muted) / <alpha-value>)',
                    'card': 'oklch(var(--game-card) / <alpha-value>)',
                    'border': 'oklch(var(--game-border) / <alpha-value>)',
                    'warning': 'oklch(var(--game-warning) / <alpha-value>)'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)'
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'tap-pop': {
                    '0%': { 
                        transform: 'translate(-50%, -50%) scale(0.5)',
                        opacity: '1'
                    },
                    '50%': { 
                        transform: 'translate(-50%, -100%) scale(1.2)',
                        opacity: '1'
                    },
                    '100%': { 
                        transform: 'translate(-50%, -150%) scale(1)',
                        opacity: '0'
                    }
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' }
                },
                'twinkle': {
                    '0%, 100%': { 
                        opacity: '0.3',
                        transform: 'scale(1)'
                    },
                    '50%': { 
                        opacity: '0.6',
                        transform: 'scale(1.1)'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'tap-pop': 'tap-pop 1s ease-out forwards',
                'gradient-shift': 'gradient-shift 3s ease infinite',
                'twinkle': 'twinkle 3s ease-in-out infinite'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
