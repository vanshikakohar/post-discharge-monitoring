module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(), // ✅ correct for Tailwind v4
    require('autoprefixer'),
  ],
};
