import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import PageIntro from "@/components/inner/PageIntro";
import Section from "@/components/inner/Section";
import Stats from "@/components/inner/Stats";
import Mission from "@/components/sections/Mission";
import Strengths from "@/components/sections/Strengths";
import Quality from "@/components/sections/Quality";
import Milestones from "@/components/sections/Milestones";
import Partner from "@/components/sections/Partner";
import { CONTACT, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "About Us",
  "SBM GOLD: 10+ years of extrusion expertise, a 2,25,000 sq ft plant in Siliguri, 22,000 MT a year and 300+ dealers. Our story, strengths and quality.",
  "/about",
  "/images/sbm/company-02.jpg",
);

const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;

// Size and capacity numbers are in the maroon band above, so this card stays short
const MAKES = ["uPVC Profiles", "WPC Door Frames", "HDPE & uPVC Pipes", "Water Tanks", "Wall Putty"];

export default function AboutPage() {
  return (
    <SiteLayout variant="inner">
      <PageIntro
        word="About"
        title="From Pipes to Profiles"
        image="/images/sbm/company-04.jpg"
        crumbs={[{ label: "About Us" }]}
      />

      {/* Same sections as the home page, so About looks and reads like the rest of the site */}
      <Mission />
      <Stats />
      <Strengths />
      <Quality />

      <Section id="overview" title="Our Company" tone="fade">
        <div id="company" className="ip-company">
          <div className="ip-company--media">
            <figure className="ip-company--main">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/company-02.jpg"
                width="1200"
                height="896"
                alt="SBM GOLD headquarters building"
              />
              <figcaption>
                <span>Headquarters</span>
                Siliguri, West Bengal
              </figcaption>
            </figure>
            <figure className="ip-company--inset">
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

          <div className="ip-company--info">
            <p className="ip-eyebrow">{CONTACT.company}</p>
            <h3 className="ip-company--lead">
              Made in Siliguri,
              <br />
              built for Indian homes.
            </h3>

            <ul className="ip-company--makes" aria-label="What we make">
              {MAKES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <ul className="ip-company--meta">
              <li>
                <span className="ip-company--icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                </span>
                <span>
                  <b>Head office</b>
                  Metro Plaza, SF Road, Siliguri
                </span>
              </li>
              <li>
                <span className="ip-company--icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <span>
                  <b>Certified</b>
                  ISO 9001:2015 &middot; ISO 4427 &middot; BIS
                </span>
              </li>
            </ul>

            <div className="ip-actions">
              <Link href="/contact" className="ip-btn">
                Contact Us
              </Link>
              <a href={DIRECTIONS} className="ip-btn ip-btn--ghost" target="_blank" rel="noopener noreferrer">
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Milestones />
      <Partner />
    </SiteLayout>
  );
}
