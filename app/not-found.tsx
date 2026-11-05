import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | SBM GOLD",
  alternates: { canonical: null },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#ffffff",
        color: "#212121",
        fontFamily: "var(--font-base), sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "96px",
          fontWeight: 800,
          color: "#951F17",
          lineHeight: 1,
          marginBottom: "1rem",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "28px",
          fontWeight: 700,
          marginBottom: "1rem",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          fontSize: "var(--fs-body)",
          color: "#666666",
          maxWidth: "480px",
          marginBottom: "2rem",
          lineHeight: 1.6,
        }}
      >
        The page you are looking for doesn’t exist or has been moved. Return to
        the SBM GOLD homepage to explore our architectural profiles and products.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.875rem 2rem",
          backgroundColor: "#951F17",
          color: "#ffffff",
          borderRadius: "999px",
          fontWeight: 700,
          fontSize: "var(--fs-ui)",
          textDecoration: "none",
          transition: "background-color 0.2s ease",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
