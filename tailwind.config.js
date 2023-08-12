/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
