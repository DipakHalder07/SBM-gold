import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import PageIntro from "@/components/inner/PageIntro";
import Section from "@/components/inner/Section";
import Stats from "@/components/inner/Stats";
import { CONTACT, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "About Us",
  "SBM GOLD has 10+ years of extrusion expertise, a 2,25,000 sq ft facility, 22,000 MT yearly capacity and a network of 300+ dealers. Learn about our story, strengths and quality.",
  "/about",
  "/images/sbm/company-02.jpg",
);

const STRENGTHS = [
  {
    title: "Profiles designed to European standards",
    text: "Sleek aesthetics with robust engineering. Our multi-chambered profiles work with European hardware systems and come with advanced locking systems for enhanced security.",
  },
  {
    title: "Thermal insulation for quieter, cooler homes",
    text: "Multi-chambered profiles give superior heat insulation and cut outdoor noise, keeping your rooms calm and comfortable through every season.",
  },
  {
    title: "Built for every Indian climate extreme",
    text: "Weather-sealed, termite-proof and low maintenance. Our profiles resist sun, rain and humidity for a long lifespan.",
  },
  {
    title: "Your all-in-one solution, from profile to installation",
    text: "End-to-end expertise with customisable styles and finishes, professional installation by our own team and reliable after-sales support.",
  },
  {
    title: "Trusted by builders, backed by industry veterans",
    text: "With 10+ years of extrusion expertise, SBM GOLD is a trusted name for builders and homeowners. Our eco-friendly, recyclable uPVC is made to last.",
  },
];

const QUALITY = [
  {
    title: "ISO certified quality",
    text: "Certified to ISO 9001:2015 and ISO 4427. Caliper and wall-thickness checks on every batch keep each profile true to spec.",
  },
  {
    title: "Automated extrusion",
    text: "PLC-controlled lines hold every profile wall uniform, metre after metre.",
  },
  {
    title: "Protective shield",
    text: "Factory-applied film keeps profiles scratch-free from our plant to your site.",
  },
  {
    title: "20-year warranty",
    text: "Our uPVC profiles are backed by a 20-year warranty.",
  },
];

const FACTS = [
  { label: "Company", value: CONTACT.company },
  { label: "Head office", value: CONTACT.address },
  { label: "Facility", value: "2,25,000 sq ft modern manufacturing facility" },
  { label: "Capacity", value: "22,000 MT per year" },
  { label: "Network", value: "300+ dealers" },
  { label: "Certifications", value: "ISO 9001:2015, ISO 4427 and BIS" },
];

const MILESTONES = [
  { year: "2025", tag: "Launch", text: "Launched uPVC profiles for windows & doors and WPC door frames" },
  { year: "2023", tag: "Milestone", text: "First company in North East India to manufacture 450mm HDPE pipes" },
];

export default function AboutPage() {
  return (
    <SiteLayout variant="inner">
      <PageIntro
        word="About"
        title="From Pipes to Profiles"
        image="/images/sbm/company-04.jpg"
        crumbs={[{ label: "About Us" }]}
        lead="From humble beginnings at SBM Plaza to a trusted name in building materials, SBM GOLD makes durable, precision-engineered products for every Indian home."
      />

      <div className="ip-wrap">
        <div className="ip-banner">
          <img
            src="/images/sbm/emblem-05.jpg"
            width="1800"
            height="1018"
            alt="SBM GOLD team inspecting uPVC profiles at the manufacturing facility"
            fetchPriority="high"
          />
        </div>
      </div>

      <Section title="Our mission">
        <p className="ip-statement">Bringing nature&rsquo;s serenity straight to you with doors and windows.</p>
        <div className="ip-prose">
          <p>
            Backed by SBM GOLD&rsquo;s legacy of quality and innovation, our uPVC doors and windows profiles offer
            world-class, custom solutions for Indian homes. Crafted with German technology and automated precision, they
            ensure all-weather durability and superior noise and heat insulation.
          </p>
        </div>
      </Section>

      <Stats />

      <Section id="feature" title="Our strengths">
        <ul className="ip-list">
          {STRENGTHS.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="quality" title="Quality">
        <ul className="ip-list ip-list--two">
          {QUALITY.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="overview" title="Company">
        <dl className="ip-facts ip-facts--wide">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div id="company" className="ip-figures">
          <figure>
            <img
              loading="lazy"
              decoding="async"
              src="/images/sbm/company-02.jpg"
              width="1200"
              height="896"
              alt="SBM GOLD headquarters building"
            />
            <figcaption>Headquarters</figcaption>
          </figure>
          <figure>
            <img
              loading="lazy"
              decoding="async"
              src="/images/sbm/company-03.jpg"
              width="1200"
              height="884"
              alt="The SBM GOLD team"
            />
            <figcaption>Our team</figcaption>
          </figure>
        </div>
      </Section>

      <Section id="news" title="Milestones">
        <ul className="ip-timeline">
          {MILESTONES.map((item) => (
            <li key={item.year}>
              <span className="year">{item.year}</span>
              <div>
                <span className="tag">{item.tag}</span>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="recruit" title="Become a partner" tone="grey">
        <div className="ip-prose">
          <p>
            Join Eastern India&rsquo;s most trusted manufacturing network for uPVC doors and windows, WPC door frames, HDPE
            pipes, water tanks and wall putty.
          </p>
          <p>
            As an authorized distributor, dealer or project partner, scale your business with high-margin product lines,
            ISO and ISI certified reliability, state-of-the-art extrusion, and dedicated technical and marketing support.
          </p>
        </div>
        <div className="ip-actions">
          <Link href="/partner" className="ip-btn">
            Become a Partner
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
