/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      joker: ["Jokerman"],
    },
    extend: {
      colors: {
        badge: "rgba(252, 250, 250, 0.61)",
        link: "rgba(255, 255, 255, 0.71)",
        address: "#F1F4FF",
        "address-text": "#8695AB",
      },
      backgroundImage: {
        main: "url('/lizzbg.png')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
