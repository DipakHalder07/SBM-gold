/** The diagonal slash used across the site. Style it with the theme's `.deco` classes. */
export default function Deco({ className }: { className: string }) {
  return (
    <span className={`deco ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
        <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
      </svg>
    </span>
  );
}
