import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import PageIntro from "@/components/inner/PageIntro";
import Section from "@/components/inner/Section";
import { posts } from "@/lib/blog";
import { products } from "@/lib/products";
import { pageMetadata, type NavLink } from "@/lib/site";

export const metadata = pageMetadata("Sitemap", "Every page on the SBM GOLD website.", "/sitemap");

const GROUPS: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Become a Partner", href: "/partner" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "All Products", href: "/products" },
      ...products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
    ],
  },
  {
    title: "Blog",
    links: [
      { label: "All Articles", href: "/blog" },
      ...posts.map((post) => ({ label: post.title, href: `/blog/${post.slug}` })),
    ],
  },
];

export default function SitemapPage() {
  return (
    <SiteLayout variant="inner">
      <PageIntro
        word="Sitemap"
        title="Sitemap"
        image="/images/sbm/company-02.jpg"
        crumbs={[{ label: "Sitemap" }]}
      />

      {GROUPS.map((group) => (
        <Section key={group.title} title={group.title}>
          <div className="ip-article--body">
            <ul>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}
    </SiteLayout>
  );
}
