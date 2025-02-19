/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
import img from './src/images/user-not-found.jpg'

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '486px',
        'xa': '364px',
        'xx': '346px'
      },
      boxShadow: {
        'glow': '0 0 10px 3px rgba(255, 0, 255, 0.7), 0 0 20px 6px rgba(255, 0, 255, 0.5)',
        '3xl': '2px  2px 8px rgba(31, 122, 140, 0.3), -2px -2px 8px rgba(31, 122, 140, 0.3)',
        '4xl': '2px 2px 8px #fff, -2px -2px 8px #fff'
      },
      backgroundColor: {
        "content" : "#F8FAFC",
        'search-bg': '#72A0C1',
        'dark':'#151419',
        'lava':'#f56f10',
        'glucongrey':'#1b1a1f',
        'gray2':'#262626',
        'dustygrey':'#878787',
        'snow':'#fbfbfb',
        'save-dark': '#010104',
      },
      ringColor: {
        "content" : "#F8FAFC",
        'search-bg': '#72A0C1',
        'dark':'#151419',
        'lava':'#f56f10',
        'glucongrey':'#1b1a1f',
        'gray2':'#262626',
        'dustygrey':'#878787',
        'snow':'#fbfbfb',
      },
      borderColor: {
        "search-border": '#FFFFFF ',
        'generate-cta': '#00C9A7  ',
        'glucongrey':'#1b1a1f',
        'dark':'#151419',
        'gray2':'#262626',
        'dustygrey':'#878787',
        'snow':'#fbfbfb',
      },
      textColor: {
        "hov": "#334155",
        'lava':'#f56f10',
        'dark':'#151419',
        'gray2':'#262626',
        'dustygrey':'#878787',
        'snow':'#fbfbfb',
        'text': '#ebe9fc',
      },
      backgroundImage:{
        "content-img": "linear-gradient(to bottom, #1a2a6c, #b21f1f)",
        "nav": "linear-gradient(180deg, #f3f4f6, #e5e7eb)",
        "hero": "linear-gradient(135deg, #4A90E2, #FF6F61)",
        "hero2": "linear-gradient(38deg,    hsl(305deg 100% 35%) 0%,    hsl(308deg 81% 40%) 4%,    hsl(312deg 71% 44%) 9%,    hsl(315deg 64% 47%) 13%,    hsl(318deg 60% 50%) 17%,    hsl(320deg 62% 53%) 22%,    hsl(323deg 64% 56%) 26%,    hsl(326deg 66% 58%) 30%,    hsl(328deg 68% 61%) 35%,    hsl(331deg 70% 63%) 39%,    hsl(333deg 72% 66%) 43%,    hsl(335deg 74% 68%) 48%,    hsl(338deg 76% 70%) 52%,    hsl(340deg 78% 72%) 57%,    hsl(342deg 81% 74%) 61%,    hsl(344deg 83% 76%) 65%,    hsl(346deg 85% 78%) 70%,    hsl(348deg 87% 80%) 74%,    hsl(350deg 89% 82%) 78%,    hsl(352deg 91% 83%) 83%,    hsl(354deg 94% 85%) 87%,    hsl(356deg 96% 87%) 91%,    hsl(358deg 98% 88%) 96%,    hsl(0deg 100% 90%) 100%)",
        "main2": "linear-gradient(0deg,   hsl(240deg 99% 73%) 0%,    hsl(241deg 98% 75%) 0%,    hsl(241deg 96% 77%) 0%,    hsl(241deg 95% 78%) 1%,    hsl(241deg 93% 80%) 2%,    hsl(240deg 90% 82%) 4%,    hsl(239deg 88% 83%) 6%,    hsl(237deg 84% 85%) 9%,    hsl(234deg 80% 86%) 14%,    hsl(230deg 75% 87%) 23%,    hsl(224deg 69% 88%) 42%,    hsl(215deg 62% 89%) 77%,    hsl(200deg 53% 90%) 100%)",
        "main": "linear-gradient(0deg, hsl(240deg 99% 63%) 0%, hsl(243deg 98% 66%) 0%, hsl(245deg 98% 68%) 0%, hsl(247deg 97% 71%) 1%, hsl(247deg 96% 73%) 2%,    hsl(247deg 94% 76%) 4%,    hsl(247deg 92% 79%) 6%,    hsl(246deg 89% 81%) 9%,    hsl(244deg 85% 84%) 14%,hsl(240deg 79% 86%) 23%,hsl(233deg 72% 87%) 42%,hsl(221deg 64% 89%) 77%,hsl(200deg 53% 90%) 100%)",
        'nav-hover': 'linear-gradient(90deg, rgba(58,123,213,1) 0%, rgba(0,210,255,1) 100%)',
        "content-hov": "linear-gradient(    55deg,    hsl(0deg 100% 50%) 0%,    hsl(345deg 100% 60%) 11%,    hsl(330deg 100% 71%) 22%,    hsl(315deg 100% 81%) 33%,    hsl(300deg 100% 92%) 44%,    hsl(300deg 100% 92%) 56%,    hsl(315deg 100% 81%) 67%,    hsl(330deg 100% 71%) 78%,    hsl(345deg 100% 60%) 89%,    hsl(0deg 100% 50%) 100%)",
        "generator-bg": " linear-gradient(315deg, #7a7adb 0%, #170e13 74%);",
        "save-subtitle": "linear-gradient(#31a8d8, #5400c2)",
        "not-found": "url('./images/user-not-found.jpg')",
      },
      
      fontFamily: {
        spartan: ['"League Spartan"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        'public-sans': ['"Public Sans"', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        monostrat: "Montserrat",
      }
    },
  
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.save-gradient': {
          background: 'linear-gradient(to right, #5331c1, #00c291)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          
        },
      });
    }),
  ],
}

