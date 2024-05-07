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
      },
      backgroundImage: {
        'city': 'url("/assets/bg/bg-4.svg")',
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
    },
  },
  plugins: [],
};
export default config;
