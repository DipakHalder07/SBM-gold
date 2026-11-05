import SiteLayout from "@/components/SiteLayout";
import BlogCard from "@/components/inner/BlogCard";
import CtaBand from "@/components/inner/CtaBand";
import PageIntro from "@/components/inner/PageIntro";
import { posts } from "@/lib/blog";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Blog",
  "Practical guides from SBM GOLD on choosing uPVC windows, WPC door frames, HDPE and uPVC pipes, water tanks and wall putty.",
  "/blog",
);

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <SiteLayout variant="inner">
      <PageIntro
        word="Blog"
        title="Guides & Insights"
        image="/images/sbm/gallery-02.jpg"
        crumbs={[{ label: "Blog" }]}
        lead="Practical advice on choosing and using building materials, from the team at SBM GOLD."
      />

      <section className="ip-blog">
        <div className="ip-wrap">
          <BlogCard post={featured} featured />
          <div className="ip-tiles ip-tiles--three ip-blog--grid">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Have a question?" text="Tell us about your project and our team will help you find the right product." />
    </SiteLayout>
  );
}
