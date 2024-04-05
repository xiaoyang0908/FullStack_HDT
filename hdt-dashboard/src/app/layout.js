'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CookiesProvider>
          {children}
        </CookiesProvider>
      </body>
    </html>
  );
}
