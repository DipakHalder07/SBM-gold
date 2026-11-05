import SiteLayout from "@/components/SiteLayout";
import PageIntro from "@/components/inner/PageIntro";
import Section from "@/components/inner/Section";
import { CONTACT, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Privacy Policy",
  "How SBM GOLD uses the details you share when you contact us through this website.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <SiteLayout variant="inner">
      <PageIntro
        word="Privacy"
        title="Privacy Policy"
        image="/images/sbm/company-02.jpg"
        crumbs={[{ label: "Privacy Policy" }]}
        lead="This page explains what happens to the details you share with SBM GOLD through this website. Last updated: 5 November 2026."
      />

      <Section title="What we collect">
        <div className="ip-prose">
          <p>
            We only receive the details you choose to send us, such as your name, phone number, email address, city and
            message. You can browse this website without giving us any of these details.
          </p>
        </div>
      </Section>

      <Section title="Inquiry forms" tone="grey">
        <div className="ip-prose">
          <p>
            The forms on this website do not store your details. Sending a form opens your own email app with the message
            ready to go, and we receive it only if you send that email.
          </p>
        </div>
      </Section>

      <Section title="How we use your details">
        <div className="ip-prose">
          <p>
            We use your details to reply to you, to talk about our products or a partnership, and to support you as a
            customer or partner. We do not sell your details.
          </p>
        </div>
      </Section>

      <Section title="Cookies and other websites" tone="grey">
        <div className="ip-prose">
          <p>
            This website does not use analytics or advertising cookies. Our hosting provider may keep standard technical
            logs, such as IP addresses, to run the website and keep it secure.
          </p>
          <p>
            Links to other websites, such as Instagram and Google Maps, are covered by those websites&rsquo; own privacy
            policies.
          </p>
        </div>
      </Section>

      <Section title="Your choices">
        <div className="ip-prose">
          <p>
            To ask what details we hold about you, or to have them corrected or deleted, write to{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
            <a href={CONTACT.tollFreeHref}>{CONTACT.tollFree}</a>.
          </p>
          <p>
            {CONTACT.company}
            <br />
            {CONTACT.address}
          </p>
        </div>
      </Section>
    </SiteLayout>
  );
}
