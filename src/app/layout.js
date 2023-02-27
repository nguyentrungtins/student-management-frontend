import "./globals.css";
import { Inter } from "@next/font/google";
import { Suspense } from "react";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <Suspense></Suspense>
      <body className="bg-[#F9F9FB]">{children}</body>
    </html>
  );
}
