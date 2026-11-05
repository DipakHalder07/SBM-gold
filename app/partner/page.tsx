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

const PARTNER_TYPES = [
  {
    title: "Authorized distributor",
    text: "Carry SBM GOLD products in your region and grow alongside our dealer network.",
  },
  {
    title: "Dealer",
    text: "Offer SBM GOLD products to the builders and homeowners in your area.",
  },
  {
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
    text: "Sell products backed by ISO and ISI certified quality, with checks on every batch.",
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
    <SiteLayout variant="inner">
      <PageIntro
        word="Partner"
        title="Grow With SBM GOLD"
        image="/images/sbm/gallery-06.jpg"
        crumbs={[{ label: "Become a Partner" }]}
        lead="Join Eastern India's most trusted manufacturing network for uPVC doors and windows, WPC door frames, HDPE pipes, water tanks and wall putty."
      />

      <Section id="types" title="Ways to partner">
        <ul className="ip-list ip-list--three">
          {PARTNER_TYPES.map((type) => (
            <li key={type.title}>
              <h3>{type.title}</h3>
              <p>{type.text}</p>
            </li>
          ))}
        </ul>
        <div className="ip-actions">
          <Link href="#inquiry" className="ip-btn">
            Apply to Partner
          </Link>
        </div>
      </Section>

      <Stats />

      <Section id="why" title="Why partner with us">
        <ul className="ip-list ip-list--two">
          {BENEFITS.map((benefit) => (
            <li key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What you can offer">
        <ul className="ip-tags">
          {products.map((product) => (
            <li key={product.slug}>
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="How it works">
        <ol className="ip-steps">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="inquiry" title="Partner inquiry" tone="grey">
        <p className="ip-section--note">
          Prefer to talk? Call us toll free on <a href={CONTACT.tollFreeHref}>{CONTACT.tollFree}</a>.
        </p>
        <ContactForm topic="partner" />
      </Section>
    </SiteLayout>
  );
}
