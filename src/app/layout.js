import "./globals.css";

export const metadata = {
  title: "UESC",
  description: "UMN English Student Council",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}