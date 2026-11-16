/**
 * Inner page section in the home page style: big centred uppercase title,
 * and white / grey backgrounds that alternate down the page.
 * `compact` is for text-heavy pages (privacy, sitemap): smaller left title, no slashes.
 * `plain` keeps the big title but drops the slashes.
 */
export default function Section({
  id,
  title,
  tone,
  compact = false,
  plain = false,
  lead,
  children,
}: {
  id?: string;
  title: string;
  tone?: "grey" | "white" | "fade";
  compact?: boolean;
  /** No diagonal slashes: for busy content like product pages. */
  plain?: boolean;
  /** Short line under the title. */
  lead?: string;
  children: React.ReactNode;
}) {
  const cls = ["ip-section", "scroll_active", tone ? `ip-section--${tone}` : "", compact ? "ip-section--compact" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={cls}>
      <div className="ip-wrap">
        <div className="ttlarea">
          <h2 className={`ttl ttl-01 ${compact ? "txt-lft" : "txt-ctr"} ip-section--ttl`}>
            <span className="ttl-txt block">{title}</span>
          </h2>
          {lead && <p className="ip-section--lead">{lead}</p>}
        </div>
        <div className="ip-section--body">{children}</div>
      </div>
    </section>
  );
}
