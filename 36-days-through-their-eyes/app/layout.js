// src/app/layout.js

import "./globals.css";

export const metadata = {
  title: "36 Days Through Their Eyes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}