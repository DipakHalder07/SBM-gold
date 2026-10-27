import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sbmgold.com"),
  title: "SBM GOLD | Custom Precision Parts & Equipment Procurement",
  description:
    "99% Custom-Made Precision Components. SBM GOLD delivers optimal procurement and engineering solutions across global supply networks with unmatched precision and quality assurance.",
  openGraph: {
    title: "SBM GOLD",
    description:
      "99% Custom-Made Precision Components. SBM GOLD delivers optimal procurement and engineering solutions across global supply networks with unmatched precision and quality assurance.",
    url: "https://www.sbmgold.com/",
    siteName: "SBM GOLD",
    images: [
      {
        url: "/images/logo/sbm-gold-logo.png",
        width: 1200,
        height: 630,
        alt: "SBM GOLD",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes"
        />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="/wp/wp-content/themes/standard_sass/css/style.css"
        />
      </head>
      <body className="home" id="top">
        {/* SVG definitions for icons */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
          }}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <symbol id="icon-tel" viewBox="0 0 24 24.02">
              <title>tel</title>
              <path d="m18.25,15.88c-.61-.7-1.68-.77-2.38-.16-.06.05-.11.1-.16.16-.59.59-1.19,1.18-1.77,1.78-.11.16-.33.2-.49.09-.39-.21-.8-.38-1.16-.61-1.7-1.1-3.2-2.46-4.45-4.05-.65-.77-1.19-1.63-1.59-2.55-.09-.16-.05-.36.09-.47.59-.58,1.17-1.16,1.76-1.75.72-.6.81-1.68.21-2.4-.07-.08-.14-.15-.22-.21-.46-.47-.93-.92-1.39-1.39s-.95-.97-1.44-1.44c-.61-.7-1.68-.77-2.38-.16-.06.05-.11.1-.16.16-.6.59-1.18,1.2-1.78,1.78C.37,5.17.05,5.87,0,6.61c-.05,1.22.17,2.44.64,3.56.9,2.34,2.2,4.51,3.84,6.4,2.16,2.59,4.84,4.69,7.87,6.16,1.35.71,2.84,1.14,4.36,1.27,1.03.12,2.05-.27,2.74-1.04.51-.58,1.08-1.09,1.62-1.64.72-.61.81-1.68.2-2.4-.06-.07-.12-.13-.19-.19-.95-.95-1.9-1.9-2.86-2.85Zm-.95-3.98l1.84-.32c-.29-1.68-1.09-3.23-2.3-4.44-1.27-1.28-2.92-2.1-4.7-2.34l-.26,1.85c2.76.38,4.95,2.51,5.42,5.25h0Zm2.88-8.01C18.08,1.77,15.34.4,12.38,0l-.26,1.85c5.1.72,9.16,4.65,10.04,9.73l1.84-.31c-.48-2.8-1.82-5.38-3.83-7.38Z" />
            </symbol>
            <symbol id="icon-mail" viewBox="0 0 16 12">
              <title>mail</title>
              <path
                d="M2586,1665.7l-0.01-.01-8-6.41V1670h16.02v-10.72Zm0-1.28,8.01-6.42h-16.02Z"
                transform="translate(-2578 -1658)"
              />
            </symbol>
            <symbol id="icon-arrow" viewBox="0 0 13.38 13.28">
              <title>arrow</title>
              <path
                d="M1623.11,5360.04l-1.41,1.48,3.89,4.1h-9.54v2.1h9.54l-3.89,4.1,1.41,1.48,6.3-6.63Z"
                transform="translate(-1616.03 -5360.03)"
              />
            </symbol>
            <symbol id="icon-facebook" viewBox="0 0 1024 1024">
              <title>facebook</title>
              <path d="M1024,512C1024,229.2,794.8,0,512,0S0,229.2,0,512c0,255.6,187.2,467.4,432,505.8V660H302V512h130V399.2 C432,270.9,508.4,200,625.4,200c56,0,114.6,10,114.6,10v126h-64.6c-63.6,0-83.4,39.5-83.4,80v96h142l-22.7,148H592v357.8 C836.8,979.4,1024,767.6,1024,512z" />
            </symbol>
            <symbol id="icon-instagram" viewBox="0 0 503.8 503.8">
              <title>instagram</title>
              <path d="M251.9,45.4c67.3,0,75.2,0.3,101.8,1.5c24.6,1.1,37.9,5.2,46.8,8.7c11.8,4.6,20.2,10,29,18.8 c8.8,8.8,14.3,17.2,18.8,29c3.4,8.9,7.6,22.2,8.7,46.8c1.2,26.6,1.5,34.5,1.5,101.8s-0.3,75.2-1.5,101.8 c-1.1,24.6-5.2,37.9-8.7,46.8c-4.6,11.8-10,20.2-18.8,29c-8.8,8.8-17.2,14.3-29,18.8c-8.9,3.4-22.2,7.6-46.8,8.7 c-26.6,1.2-34.5,1.5-101.8,1.5s-75.2-0.3-101.8-1.5c-24.6-1.1-37.9-5.2-46.8-8.7c-11.8-4.6-20.2-10-29-18.8 c-8.8-8.8-14.3-17.2-18.8-29c-3.4-8.9-7.6-22.2-8.7-46.8c-1.2-26.6-1.5-34.5-1.5-101.8s0.3-75.2,1.5-101.8 c1.1-24.6,5.2-37.9,8.7-46.8c4.6-11.8,10-20.2,18.8-29c8.8-8.8,17.2-14.3,29-18.8c8.9-3.4,22.2-7.6,46.8-8.7 C176.7,45.6,184.7,45.4,251.9,45.4 M251.9,0c-68.4,0-77,0.3-103.9,1.5C121.2,2.7,102.9,7,86.9,13.2c-16.6,6.4-30.6,15.1-44.6,29.1 c-14,14-22.6,28.1-29.1,44.6c-6.2,16-10.5,34.3-11.7,61.2C0.3,174.9,0,183.5,0,251.9c0,68.4,0.3,77,1.5,103.9 c1.2,26.8,5.5,45.1,11.7,61.2c6.4,16.6,15.1,30.6,29.1,44.6c14,14,28.1,22.6,44.6,29.1c16,6.2,34.3,10.5,61.2,11.7 c26.9,1.2,35.4,1.5,103.9,1.5s77-0.3,103.9-1.5c26.8-1.2,45.1-5.5,61.2-11.7c16.6-6.4,30.6-15.1,44.6-29.1 c14-14,22.6-28.1,29.1-44.6c6.2-16,10.5-34.3,11.7-61.2c1.2-26.9,1.5-35.4,1.5-103.9s-0.3-77-1.5-103.9 c-1.2-26.8-5.5-45.1-11.7-61.2c-6.4-16.6-15.1-30.6-29.1-44.6c-14-14-28.1-22.6-44.6-29.1c-16-6.2-34.3-10.5-61.2-11.7 C328.9,0.3,320.3,0,251.9,0L251.9,0z" />
              <path d="M251.9,122.6c-71.4,0-129.4,57.9-129.4,129.4s57.9,129.4,129.4,129.4s129.4-57.9,129.4-129.4 S323.4,122.6,251.9,122.6z M251.9,335.9c-46.4,0-84-37.6-84-84c0-46.4,37.6-84,84-84s84,37.6,84,84 C335.9,298.3,298.3,335.9,251.9,335.9z" />
              <circle cx="386.4" cy="117.4" r="30.2" />
            </symbol>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
