'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "react-cookie";
import { Middleware } from "@/app/util/middleware";
import { PatientProvider } from "../app/contexts/PatientContext";
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <CookiesProvider>
          <PatientProvider>
            <body className={inter.className}>
              <Middleware>
                {children}
              </Middleware>
            </body>
          </PatientProvider>
        </CookiesProvider>
    </html>
  );
}
