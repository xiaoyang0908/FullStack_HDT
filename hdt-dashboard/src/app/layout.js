'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "react-cookie";
import { Middleware } from "@/app/util/middleware";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <CookiesProvider>
        <body className={inter.className}>
          <Middleware>
            {children}
          </Middleware>
        </body>
        </CookiesProvider>
    </html>
  );
}
