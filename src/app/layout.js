import "./globals.css";
import { Inter } from "@next/font/google";
import { Suspense } from "react";
import Loading from "./loading";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <Suspense fallback={<Loading />}>
        <body className="bg-[#F9F9FB]">{children}</body>
      </Suspense>
    </html>
  );
}
