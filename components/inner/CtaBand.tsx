import Link from "next/link";
import { CONTACT } from "@/lib/site";

export default function CtaBand({
  title = "Not sure what you need?",
  text = "Tell us about your project and our team will help you choose the right product.",
  href = "/contact",
  label = "Contact Us",
}: {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="ip-cta">
      <div className="ip-wrap ip-cta--grid">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="ip-actions">
          <Link href={href} className="ip-btn">
            {label}
          </Link>
          <a href={CONTACT.tollFreeHref} className="ip-btn ip-btn--ghost">
            {CONTACT.tollFree}
          </a>
        </div>
      </div>
    </section>
  );
}
