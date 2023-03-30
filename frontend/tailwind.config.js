/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: '#080A12',
        lessDarker: '#131624',
      },
      colors: {
        'wash-dark': '#23272F',
        'wash-sec': '#F6F7F9',
      },
      fontFamily: {
        OpenSans: 'Open Sans',
        OpenSansBold: 'OpenSansBold',
      },
      width: {
        112: '28rem',
        104: '26rem',
        '500px': '500px',
        '600px': '560px',
        '800px': '800px',
      },
      height: {
        112: '28rem',
        104: '26rem',
        '500px': '500px',
        '600px': '560px',
        '800px': '800px',
      },
      screens: {
        xs: '428px',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
