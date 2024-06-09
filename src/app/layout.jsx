import { Poppins } from "next/font/google";
import "../styles/App.scss";
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Zayd Dashboard",
  description: "A dashboard to manage my portfolio",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon-32x32.png" />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
