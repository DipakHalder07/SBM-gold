import SiteLayout from "@/components/SiteLayout";
import PageIntro from "@/components/inner/PageIntro";
import Section from "@/components/inner/Section";
import ProductBrowser from "@/components/inner/ProductBrowser";
import Stats from "@/components/inner/Stats";
import JsonLd from "@/components/JsonLd";
import { products } from "@/lib/products";
import { itemListSchema } from "@/lib/seo";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Products",
  "SBM GOLD uPVC windows and doors, WPC door frames, HDPE pipes, uPVC and agri pipes, water tanks and wall putty. ISO & BIS certified, made in Siliguri.",
  "/products",
);

export default function ProductsPage() {
  return (
    <SiteLayout variant="inner">
      <JsonLd
        data={itemListSchema(
          "SBM GOLD products",
          products.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
        )}
      />
      <PageIntro
        word="Products"
        title="Our Product Range"
        image="/images/sbm/hero-products.jpg"
        crumbs={[{ label: "Products" }]}
      />

      <Section
        id="range"
        title="All Products"
        tone="grey"
        plain
        lead="uPVC windows and doors, WPC door frames, pipes, water tanks and wall putty, made for Indian homes and projects."
      >
        <ProductBrowser />
      </Section>

      <Stats />
    </SiteLayout>
  );
}
