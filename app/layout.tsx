import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export const metadata: Metadata = {
  title: { default:"CanAm Off Road Hub | Premium ATVs, SxS & Off-Road Vehicles", template:"%s | CanAm Off Road Hub" },
  description:"Authorized Can-Am dealer for premium ATVs, side-by-sides, and utility vehicles.",
};
export default function RootLayout({ children }:{ children:React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body><Navbar /><main>{children}</main><Footer /></body>
    </html>
  );
}
