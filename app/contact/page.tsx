import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import ContactForm from "@/components/ContactForm";
import PageIntro from "@/components/inner/PageIntro";
import { CONTACT, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Contact Us",
  "Talk to SBM GOLD about uPVC windows and doors, WPC door frames, water tanks, pipes and wall putty. Call toll free 1800-8893-850 or send us an inquiry.",
  "/contact",
);

const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;

export default function ContactPage() {
  return (
    <SiteLayout variant="inner">
      <PageIntro
        word="Contact"
        title="Get in Touch"
        image="/images/sbm/company-02.jpg"
        crumbs={[{ label: "Contact Us" }]}
        lead="Builders, dealers and homeowners are all welcome. Tell us what you are working on and we will take it from there."
      />

      <section id="inquiry" className="ip-section">
        <div className="ip-wrap ip-contact">
          <dl className="ip-facts ip-contact--details">
            <div>
              <dt>Toll free</dt>
              <dd>
                <a className="ip-contact--phone" href={CONTACT.tollFreeHref}>
                  {CONTACT.tollFree}
                </a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </dd>
            </div>
            <div>
              <dt>Office</dt>
              <dd>
                <address>
                  {CONTACT.company}
                  <br />
                  {CONTACT.address}
                </address>
                <a className="ip-link" href={DIRECTIONS} target="_blank" rel="noopener noreferrer">
                  Get directions
                </a>
              </dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
                  {CONTACT.instagramHandle}
                </a>
              </dd>
            </div>
            <div>
              <dt>Partners</dt>
              <dd>
                Dealer or distributor? <Link href="/partner">Become a partner</Link>
              </dd>
            </div>
          </dl>

          <div>
            <h2 className="ip-section--ttl">Send an inquiry</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
