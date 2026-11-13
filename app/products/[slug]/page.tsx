import Link from "next/link";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import ProductGallery from "@/components/ProductGallery";
import PageIntro from "@/components/inner/PageIntro";
import ProductCard from "@/components/inner/ProductCard";
import JsonLd from "@/components/JsonLd";
import { productSchema } from "@/lib/seo";
import Section from "@/components/inner/Section";
import { getProduct, getRelated, products } from "@/lib/products";
import { CONTACT, pageMetadata } from "@/lib/site";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) return {};
  return pageMetadata(product.name, product.short, `/products/${product.slug}`, product.image, {
    imageAlt: product.imageAlt,
  });
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const enquireHref = `/contact?product=${product.slug}#inquiry`;

  return (
    <SiteLayout variant="inner">
      <JsonLd data={productSchema(product)} />
      <PageIntro
        word="Products"
        title={product.name}
        image="/images/sbm/hero-products.jpg"
        crumbs={[{ label: "Products", href: "/products" }, { label: product.name }]}
      />

      <div className="ip-pd">
        <div className="ip-wrap">
          <div className="ip-pd--grid">
            <ProductGallery images={[{ src: product.image, alt: product.imageAlt }, ...(product.gallery ?? [])]} />
            <div className="ip-pd--info">
              <p className="ip-eyebrow">{product.category}</p>
              <p className="ip-lead">{product.tagline}</p>
              <div className="ip-actions">
                <Link href={enquireHref} className="ip-btn">
                  Enquire Now
                </Link>
                <a href={CONTACT.tollFreeHref} className="ip-btn ip-btn--ghost">
                  {CONTACT.tollFree}
                </a>
              </div>
              <dl className="ip-facts">
                {product.specs.map((spec) => (
                  <div key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <Section title="Overview" tone="grey" plain>
        <div className="ip-prose">
          {product.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="ip-range">
          <h3>{product.range.title}</h3>
          <ul className="ip-tags">
            {product.range.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="Key features" plain>
        <ul className="ip-list ip-list--clean ip-list--three">
          {product.features.map((feature) => (
            <li key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="more-products" title="More products" tone="grey" plain>
        <div className="ip-tiles ip-tiles--three">
          {getRelated(product).map((related) => (
            <ProductCard key={related.slug} product={related} />
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
