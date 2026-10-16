import { Inter, Montserrat } from "next/font/google";

/** Brand typeface: geometric sans of the Bmesino wordmark and tagline — headings and labels. */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

/** Body text: neutral companion to Montserrat, comfortable for long French copy on mobile. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** CSS variables consumed by the Tailwind theme (globals.css). */
export const fontVariables = `${montserrat.variable} ${inter.variable}`;
