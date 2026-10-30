import Link from "next/link";

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
          fontSize: "6rem",
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
          fontSize: "1.75rem",
          fontWeight: 700,
          marginBottom: "1rem",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          fontSize: "1rem",
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
          fontSize: "1rem",
          textDecoration: "none",
          transition: "background-color 0.2s ease",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
