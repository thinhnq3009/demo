import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'mochi': '"Mochiy Pop One", sans-serif',
        'mina': '"Mina", sans-serif',
      },
      backgroundImage: {
        'city': 'url("/assets/bg/bg-5.svg")',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'center': '1fr 350px 1fr',
      },
      width: {
        'base': '350px',
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xs': '0.5rem',
        '4xs': '0.375rem',
      },
      keyframes: {
        'flip-x': {
          from: {
            transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            'animation-timing-function': 'ease-in',
          },
          '40%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
            'animation-timing-function': 'ease-in',
          },
          '60%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
          },
          '80%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
          },
          to: {
            transform: 'perspective(400px)',
          },
        },
      },
      animation: {
        'flip-x': 'flip-x 1s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
