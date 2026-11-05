import SiteLayout from "@/components/SiteLayout";
import CtaBand from "@/components/inner/CtaBand";
import PageIntro from "@/components/inner/PageIntro";
import ProductTile from "@/components/inner/ProductTile";
import Section from "@/components/inner/Section";
import Stats from "@/components/inner/Stats";
import { productCategories, products } from "@/lib/products";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Products",
  "Explore SBM GOLD uPVC windows and doors, WPC door frames, HDPE pipes, uPVC and agri pipes, water tanks and wall putty. ISO & BIS certified, made in Siliguri, West Bengal.",
  "/products",
);

export default function ProductsPage() {
  return (
    <SiteLayout variant="inner">
      <PageIntro
        word="Products"
        title="Our Product Range"
        image="/images/sbm/hero-products.jpg"
        crumbs={[{ label: "Products" }]}
        lead="uPVC windows and doors, WPC door frames, pipes, water tanks and wall putty, made by SBM GOLD for Indian homes and projects."
      />

      {productCategories.map((category) => (
        <Section key={category} title={category}>
          <div className="ip-tiles">
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <ProductTile key={product.slug} product={product} />
              ))}
          </div>
        </Section>
      ))}

      <Stats />
      <CtaBand />
    </SiteLayout>
  );
}
