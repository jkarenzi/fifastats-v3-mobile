/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        custom:{
          blue: '#3A66BD',
          green:'#44BA4E',
          grey:'#91969E',
          blackOverlay: 'rgba(0,0,0,0.5)'
        }
      },
      fontFamily:{
        poppinsL: ['Poppins-Light'],
        poppins: ['Poppins-Regular'],
        poppinsM: ['Poppins-Medium'],
        poppinsS: ['Poppins-SemiBold'],
        poppinsB: ['Poppins-Bold'],
      }
    },
  },
  plugins: [],
}