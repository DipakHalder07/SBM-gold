import SiteLayout from "@/components/SiteLayout";
import BlogBrowser from "@/components/inner/BlogBrowser";
import PageIntro from "@/components/inner/PageIntro";
import Section from "@/components/inner/Section";
import JsonLd from "@/components/JsonLd";
import { posts } from "@/lib/blog";
import { itemListSchema } from "@/lib/seo";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Blog",
  "Practical guides from SBM GOLD on choosing uPVC windows, WPC door frames, HDPE and uPVC pipes, water tanks and wall putty.",
  "/blog",
);

export default function BlogPage() {
  return (
    <SiteLayout variant="inner" footerCredit>
      <JsonLd
        data={itemListSchema(
          "SBM GOLD articles",
          posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
        )}
      />
      <PageIntro
        word="Blog"
        title="Guides & Insights"
        image="/images/sbm/gallery-02.jpg"
        crumbs={[{ label: "Blog" }]}
      />

      <Section
        id="articles"
        title="Latest Articles"
        tone="grey"
        plain
        lead="Practical advice on choosing and using building materials, from the team at SBM GOLD."
      >
        <BlogBrowser />
      </Section>
    </SiteLayout>
  );
}
