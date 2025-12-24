/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        custom:{
          purple: '#7C3AED',
          purpleDark: '#6D28D9',
          pink: '#EC4899',
          blue: '#3B82F6',
          indigo: '#6366F1',
          green:'#10B981',
          grey:'#9CA3AF',
          lightGrey: '#F3F4F6',
          darkGrey: '#4B5563',
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