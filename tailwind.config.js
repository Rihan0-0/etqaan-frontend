module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dashboardPurple: "#7C4DFF",
        dashboardOrange: "#FFD54F",
        dashboardGreen: "#26A69A",
        dashboardBlue: "#c2e2f1",
        dashboardBg: "#FFF3E0",
        // Improved contrast colors
        textPrimary: "#1a1a1a",
        textSecondary: "#4a5568",
        textLight: "#718096",
        accent: "#7C4DFF",
      },
      fontFamily: {
        arabic: ["var(--font-noto-arabic)", "Tahoma", "Arial", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.025em" }],
        sm: ["0.875rem", { lineHeight: "1.6", letterSpacing: "0.025em" }],
        base: ["1rem", { lineHeight: "1.7", letterSpacing: "0.025em" }],
        lg: ["1.125rem", { lineHeight: "1.7", letterSpacing: "0.025em" }],
        xl: ["1.25rem", { lineHeight: "1.7", letterSpacing: "0.025em" }],
        "2xl": ["1.5rem", { lineHeight: "1.6", letterSpacing: "0.025em" }],
        "3xl": ["1.875rem", { lineHeight: "1.5", letterSpacing: "0.025em" }],
        "4xl": ["2.25rem", { lineHeight: "1.4", letterSpacing: "0.025em" }],
        "5xl": ["3rem", { lineHeight: "1.2", letterSpacing: "0.025em" }],
      },
    },
  },
  plugins: [],
};
