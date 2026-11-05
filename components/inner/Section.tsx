/** Inner page section: heading in a narrow left column, content on the right. */
export default function Section({
  id,
  title,
  tone,
  children,
}: {
  id?: string;
  title: string;
  tone?: "grey";
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`ip-section ${tone === "grey" ? "ip-section--grey" : ""}`}>
      <div className="ip-wrap ip-section--grid">
        <h2 className="ip-section--ttl">{title}</h2>
        <div className="ip-section--body">{children}</div>
      </div>
    </section>
  );
}
