import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/component/Nav";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <div>{children}</div>
      </body>
    </html>
  );
}
