/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        brand: {
          50:  "#ECF4FF",
          100: "#D8E7FF",
          200: "#B1D0FF",
          300: "#8AB8FF",
          400: "#5A9CFF",
          500: "#3284FF",   // Azul primario (propio)
          600: "#2A72DB",
          700: "#235DB3",
          800: "#1C498C",
          900: "#153768",
          DEFAULT: "#3284FF",
        },
        ink: {
          900: "#0B0E13", // fondo base oscuro
          800: "#0E121A",
          700: "#121826",
        },
      },
      boxShadow: {
        card: "0 12px 30px rgba(0,0,0,0.22)",
        soft: "0 8px 24px rgba(0,0,0,0.14)",
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(transparent 1px, rgba(255,255,255,0.04) 1px), radial-gradient(transparent 1px, rgba(255,255,255,0.04) 1px)",
        "hero-gradient":
          "radial-gradient(1200px 600px at 10% -10%, rgba(50,132,255,0.25), transparent), radial-gradient(1000px 500px at 90% 0%, rgba(42,114,219,0.18), transparent), linear-gradient(180deg, #0B0E13, #0E121A 60%, #121826)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};