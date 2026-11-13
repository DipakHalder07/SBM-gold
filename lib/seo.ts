/**
 * Structured data (schema.org JSON-LD) so search engines understand the business,
 * its products, articles and where each page sits in the site.
 * Only facts that are on the site are used here: no prices, ratings or dates are made up.
 */
import { CONTACT, SITE_URL } from "./site";
import type { Product } from "./products";
import type { BlogPost } from "./blog";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const LOGO = `${SITE_URL}/images/logo/sbm-gold-logo.png`;
const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path.split("?")[0]}`);

/** The company: a manufacturer with a head office, toll-free line and Instagram. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORG_ID,
    name: "SBM GOLD",
    legalName: CONTACT.company,
    url: SITE_URL,
    logo: LOGO,
    image: LOGO,
    description:
      "Manufacturer of uPVC doors and windows profiles, WPC door frames, HDPE and uPVC pipes, water tanks and wall putty in Siliguri, West Bengal.",
    email: CONTACT.email,
    telephone: "+91-1800-8893-850",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2nd Floor, Metro Plaza, SF Road",
      addressLocality: "Siliguri",
      addressRegion: "West Bengal",
      postalCode: "734005",
      addressCountry: "IN",
    },
    areaServed: "IN",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-1800-8893-850",
        contactType: "customer service",
        contactOption: "TollFree",
        areaServed: "IN",
      },
    ],
    sameAs: [CONTACT.instagram],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: "SBM GOLD",
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

/** Breadcrumb trail; the last item is the current page, so it needs no link. */
export function breadcrumbSchema(crumbs: { label: string; href?: string }[]) {
  const items = [{ label: "Home", href: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: abs(crumb.href) } : {}),
    })),
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/products/${product.slug}#product`,
    name: product.name,
    description: product.tagline,
    url: `${SITE_URL}/products/${product.slug}`,
    image: [product.image, ...(product.gallery ?? []).map((g) => g.src)].map(abs),
    category: product.category,
    brand: { "@type": "Brand", name: "SBM GOLD" },
    manufacturer: { "@id": ORG_ID },
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };
}

export function articleSchema(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    image: abs(post.image),
    url,
    mainEntityOfPage: url,
    articleSection: post.category,
    inLanguage: "en-IN",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** A list of links, used for the product range and the blog list. */
export function itemListSchema(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: abs(item.path),
    })),
  };
}
