import Deco from "../Deco";
import ProductCards from "../ProductCards";
import { products, type Product } from "@/lib/products";

/** The home page product grid. Inner pages reuse it with their own title and products. */
export default function ProductsSection({
  title = "OUR PRODUCTS",
  items = products,
  id = "products",
}: {
  title?: string;
  items?: Product[];
  id?: string;
}) {
  return (
    <section id={id} className="home_products scroll_active">
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

        <ProductCards items={items} />
      </div>
    </section>
  );
}
