import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import ContactForm from "@/components/ContactForm";
import PageIntro from "@/components/inner/PageIntro";
import Section from "@/components/inner/Section";
import Stats from "@/components/inner/Stats";
import { products } from "@/lib/products";
import { CONTACT, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Become a Partner",
  "Partner with SBM GOLD as an authorized distributor, dealer or project partner. Join Eastern India's trusted manufacturing network for uPVC, WPC, pipes, water tanks and wall putty.",
  "/partner",
  "/images/sbm/gallery-06.jpg",
);

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PARTNER_TYPES = [
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
        <circle cx="7" cy="17.5" r="1.8" />
        <circle cx="17" cy="17.5" r="1.8" />
      </svg>
    ),
    title: "Authorized distributor",
    text: "Carry SBM GOLD products in your region and grow alongside our dealer network.",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 10v10h16V10M3 10l2-6h14l2 6zM9 20v-5h6v5" />
      </svg>
    ),
    title: "Dealer",
    text: "Offer SBM GOLD products to the builders and homeowners in your area.",
  },
  {
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 21V5l8-2v18M12 8l8 3v10M3 21h18M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2" />
      </svg>
    ),
    title: "Project partner",
    text: "Use SBM GOLD products on your building and infrastructure projects, with support from our team.",
  },
];

const BENEFITS = [
  {
    title: "High-margin product lines",
    text: "Build your business on a range that covers uPVC, WPC, pipes, water tanks and wall putty.",
  },
  {
    title: "Certified reliability",
    text: "Sell products backed by ISO and BIS certified quality, with checks on every batch.",
  },
  {
    title: "State-of-the-art extrusion",
    text: "Automated, PLC-controlled lines at our 2,25,000 sq ft facility, with a capacity of 22,000 MT a year.",
  },
  {
    title: "Technical and marketing support",
    text: "Get dedicated technical and marketing support from the SBM GOLD team.",
  },
];

const STEPS = [
  {
    title: "Send an inquiry",
    text: "Tell us about your business, your location and the products you are interested in.",
  },
  {
    title: "Talk to our team",
    text: "We will get in touch to understand your business and answer your questions.",
  },
  {
    title: "Get started",
    text: "Once we have agreed the details, we will help you get set up with products and support.",
  },
];

export default function PartnerPage() {
  return (
    <SiteLayout variant="inner" footCta={false}>
      <PageIntro
        word="Partner"
        title="Grow With SBM GOLD"
        image="/images/sbm/gallery-06.jpg"
        crumbs={[{ label: "Become a Partner" }]}
      />

      <Section
        id="types"
        title="Ways to Partner"
        plain
        lead="Join Eastern India's most trusted manufacturing network for uPVC doors and windows, WPC door frames, HDPE pipes, water tanks and wall putty."
      >
        <ul className="ip-ptypes">
          {PARTNER_TYPES.map((type) => (
            <li key={type.title}>
              <span className="ip-ptypes--icon" aria-hidden="true">
                {type.icon}
              </span>
              <h3>{type.title}</h3>
              <p>{type.text}</p>
              <Link href="#inquiry" className="ip-link">
                Apply now
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Stats />

      <Section id="why" title="Why Partner With Us" tone="grey" plain>
        <ul className="ip-benefits">
          {BENEFITS.map((benefit) => (
            <li key={benefit.title}>
              <span className="ip-benefits--tick" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What You Can Offer" plain lead="One partnership, the full SBM GOLD range for your customers.">
        <ul className="ip-mini">
          {products.map((product) => (
            <li key={product.slug}>
              <Link href={`/products/${product.slug}`}>
                <img loading="lazy" decoding="async" src={product.image} width="398" height="266" alt="" />
                <span>{product.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="How It Works" tone="grey" plain>
        <ol className="ip-stepper">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="ip-stepper--num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="inquiry"
        title="Partner Inquiry"
        plain
        lead="Tell us about your business and where you are based. Our team will get back to you."
      >
        <div className="ip-contact">
          <ContactForm topic="partner" />

          <aside className="ip-contact--side">
            <div className="ip-contact--partner">
              <p className="ip-contact--kicker">Prefer to talk?</p>
              <p className="ip-contact--big">Call our partner team toll free.</p>
              <a href={CONTACT.tollFreeHref} className="ip-btn ip-btn--light">
                {CONTACT.tollFree}
              </a>
            </div>
            <div className="ip-contact--call">
              <p className="ip-contact--kicker">Or write to us</p>
              <a href={`mailto:${CONTACT.email}`} className="ip-contact--mail">
                {CONTACT.email.split("@")[0]}@<wbr />
                {CONTACT.email.split("@")[1]}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </SiteLayout>
  );
}
