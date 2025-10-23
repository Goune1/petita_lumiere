// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // 💡 Utilisez un nom de variable générique ou un nom spécifique (ex: chiron-sung)
        'code': ['var(--font-specific)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;