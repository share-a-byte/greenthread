import { Anek_Devanagari } from "next/font/google";
import "./globals.css";

const anek = Anek_Devanagari({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={anek.className}>{children}</body>
    </html>
  );
}
