import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import ContactForm from "@/components/ContactForm";
import PageIntro from "@/components/inner/PageIntro";
import Section from "@/components/inner/Section";
import { CONTACT, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Contact Us",
  "Talk to SBM GOLD about uPVC windows and doors, WPC door frames, water tanks, pipes and wall putty. Call toll free 1800-8893-850 or send us an inquiry.",
  "/contact",
);

const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;

const ICONS = {
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  insta: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
};

const WAYS = [
  {
    icon: ICONS.phone,
    label: "Call us",
    value: CONTACT.tollFree,
    note: "Toll-free customer support",
    action: "Call now",
    href: CONTACT.tollFreeHref,
    external: false,
  },
  {
    icon: ICONS.mail,
    label: "Email us",
    // let the long address wrap after the @ instead of mid-word
    value: (
      <>
        {CONTACT.email.split("@")[0]}@<wbr />
        {CONTACT.email.split("@")[1]}
      </>
    ),
    note: "For quotes, orders and questions",
    action: "Write an email",
    href: `mailto:${CONTACT.email}`,
    external: false,
  },
  {
    icon: ICONS.pin,
    label: "Visit us",
    value: "Metro Plaza, SF Road, Siliguri",
    note: "West Bengal, India – 734005",
    action: "Get directions",
    href: DIRECTIONS,
    external: true,
  },
  {
    icon: ICONS.insta,
    label: "Follow us",
    value: CONTACT.instagramHandle,
    note: "Our latest projects on Instagram",
    action: "Open Instagram",
    href: CONTACT.instagram,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <SiteLayout variant="inner" footCta={false}>
      <PageIntro
        word="Contact"
        title="Get in Touch"
        image="/images/sbm/company-02.jpg"
        crumbs={[{ label: "Contact Us" }]}
      />

      <Section
        id="reach"
        title="We're Here to Help"
        plain
        lead="Builders, dealers and homeowners are all welcome. Pick the way that suits you best."
      >
        <ul className="ip-ways">
          {WAYS.map((way) => (
            <li key={way.label}>
              <a
                href={way.href}
                {...(way.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="ip-ways--icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {way.icon}
                  </svg>
                </span>
                <span className="ip-ways--label">{way.label}</span>
                <span className="ip-ways--value">{way.value}</span>
                <span className="ip-ways--note">{way.note}</span>
                <span className="ip-link">{way.action}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="inquiry"
        title="Send an Inquiry"
        tone="grey"
        plain
        lead="Tell us what you are working on and our team will take it from there."
      >
        <div className="ip-contact">
          <ContactForm />

          <aside className="ip-contact--side">
            <div className="ip-contact--partner">
              <p className="ip-contact--kicker">Dealer or distributor?</p>
              <p className="ip-contact--big">Grow your business with SBM GOLD.</p>
              <Link href="/partner" className="ip-btn ip-btn--light">
                Become a Partner
              </Link>
            </div>
            <div className="ip-contact--call">
              <p className="ip-contact--kicker">Prefer to talk?</p>
              <a href={CONTACT.tollFreeHref} className="ip-contact--phone">
                {CONTACT.tollFree}
              </a>
              <p className="ip-contact--small">Toll-free customer support</p>
            </div>
          </aside>
        </div>
      </Section>
    </SiteLayout>
  );
}
