import Link from "next/link";
import { CONTACT, FOOTER_NAV } from "@/lib/site";

export default function InnerFooter() {
  return (
    <footer id="footer" className="ip-footer">
      <div className="ip-wrap">
        <div className="ip-footer--top">
          <div className="ip-footer--info">
            <Link href="/" className="ip-footer--logo">
              <img
                loading="lazy"
                decoding="async"
                src="/images/logo/sbm-gold-logo-stacked-white.png"
                width="622"
                height="454"
                alt="SBM GOLD"
              />
            </Link>
            <address>
              {CONTACT.company}
              <br />
              {CONTACT.address}
            </address>
            <p>
              <a href={CONTACT.tollFreeHref}>{CONTACT.tollFree}</a>
              <br />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </div>
          <nav className="ip-footer--nav" aria-label="Footer">
            {FOOTER_NAV.map((group) => (
              <div key={group.key}>
                <Link href={group.href} className="ip-footer--head">
                  {group.label}
                </Link>
                <ul>
                  {group.children?.map((child) => (
                    <li key={child.label}>
                      <Link href={child.href}>{child.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="ip-footer--btm">
          <small>&copy; SBM GOLD. All rights reserved.</small>
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
            Instagram {CONTACT.instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  );
}
