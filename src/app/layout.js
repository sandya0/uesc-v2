import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

export const metadata = {
  title: "UESC",
  description: "UMN English Student Council",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
    <html lang="en">
      <body>{children}</body>
    </html>
    </ViewTransitions>
  );
}