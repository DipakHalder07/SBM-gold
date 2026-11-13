import type { Metadata } from "next";
import { products } from "./products";

export const SITE_URL = "https://www.sbmgold.com";

export const CONTACT = {
  company: "SBM Pipe Industries Private Limited",
  address: "2nd Floor, Metro Plaza, SF Road, Siliguri, West Bengal, India – 734005",
  tollFree: "1800-8893-850",
  tollFreeHref: "tel:18008893850",
  email: "sbmpipeindustries@gmail.com",
  instagramHandle: "@sbmgold_",
  instagram: "https://www.instagram.com/sbmgold_/",
};

export type NavLink = { label: string; href: string };
export type NavGroup = NavLink & { key: string; children?: NavLink[] };

const productLinks: NavLink[] = products.map((p) => ({
  label: p.name,
  href: `/products/${p.slug}`,
}));

const PARTNER_INQUIRY = "/partner#inquiry";

// Only the main pages. Products keeps its dropdown so each product is one click away;
// Milestones and Company live on the About page, and Contact is the button beside the menu.
export const HEADER_NAV: NavGroup[] = [
  { key: "about", label: "About Us", href: "/about" },
  { key: "products", label: "Products", href: "/products", children: productLinks },
  { key: "partner", label: "Partner", href: "/partner" },
  { key: "blog", label: "Blog", href: "/blog" },
];

export const FOOTER_NAV: NavGroup[] = [
  {
    key: "about",
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Strengths", href: "/about#feature" },
      { label: "Colour Shades", href: "/about#quality" },
      { label: "Certifications", href: "/about#quality" },
      { label: "Warranty", href: "/about#quality" },
      { label: "Milestones", href: "/about#news" },
    ],
  },
  { key: "products", label: "Products", href: "/products", children: productLinks },
  {
    key: "company",
    label: "Company",
    href: "/about#overview",
    children: [
      { label: "Overview", href: "/about#overview" },
      { label: "CEO Message", href: "/about#company" },
      { label: "Our Team", href: "/about#company" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    key: "partner",
    label: "Partner",
    href: "/partner",
    children: [
      { label: "Become a Partner", href: "/partner" },
      { label: "Partner in India", href: "/partner#why" },
      { label: "Distributor Network", href: "/partner#types" },
      { label: "Partner Inquiry", href: PARTNER_INQUIRY },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

/** Page metadata with the canonical URL and share card pointing at the page itself. */
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string,
  options: { type?: "website" | "article"; imageAlt?: string } = {},
): Metadata {
  const fullTitle = `${title} | SBM GOLD`;
  const url = `${SITE_URL}${path}`;
  const images = [{ url: image ?? "/images/logo/sbm-gold-logo.png", alt: options.imageAlt ?? fullTitle }];
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "SBM GOLD",
      images,
      locale: "en_IN",
      type: options.type ?? "website",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}
