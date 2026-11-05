import Deco from "../Deco";
import ProductCards from "../ProductCards";
import { products } from "@/lib/products";

export default function ProductsSection({ title = "OUR PRODUCTS" }: { title?: string }) {
  return (
    <section id="products" className="home_products scroll_active">
      <Deco className="deco-1 stroke red lg reverse anime-diag-lft" />
      <Deco className="deco-2 fill gray xs reverse anime-diag-lft2 delay1" />
      <Deco className="deco-3 fill red xs reverse anime-diag-lft2 delay1" />
      <Deco className="deco-4 stroke wht lg reverse anime-diag-lft delay2" />

      <div className="ttl-en">
        <img
          loading="lazy"
          decoding="async"
          src="/theme/images/top/products-ttl.svg"
          width="867"
          height="139"
          className="anime-fade-lft img-specif"
          alt="Products"
        />
      </div>

      <div className="inner inner-md">
        <div className="ttlarea">
          <h2 className="ttl ttl-01 txt-lft">
            <span className="jp block">{title}</span>
          </h2>
        </div>

        <ProductCards items={products} />
      </div>
    </section>
  );
}
