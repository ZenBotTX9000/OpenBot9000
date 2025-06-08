import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  // --- CRUCIAL UPDATE FOR SRC DIRECTORY ---
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  // ---------------------------------------
  prefix: "",
  theme: {
    // ... (rest of the file is unchanged)
  },
  plugins: [
    // ... (rest of the file is unchanged)
  ],
} satisfies Config

export default config
